import dotenv from 'dotenv';
import https from 'https';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const model = 'gemini-1.5-flash-001';

if (!apiKey) {
  console.error('❌ .envファイルにGEMINI_API_KEYが設定されていません。');
  process.exit(1);
}

const data = JSON.stringify({
  contents: [{
    parts: [{
      text: "test"
    }]
  }]
});

const options = {
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🔑 APIキーの有効性を確認しています...');

const req = https.request(options, (res) => {
  let responseBody = '';
  res.on('data', (chunk) => {
    responseBody += chunk;
  });
  res.on('end', () => {
    try {
      const parsed = JSON.parse(responseBody);
      if (parsed.error) {
        console.error('❌ APIキーが無効か、APIが有効になっていません。');
        console.error('エラー詳細:', parsed.error.message);
      } else if (parsed.candidates) {
        console.log('✅ APIキーは有効です！');
      } else {
        console.error('🤔 予期せぬ応答がありました:', responseBody);
      }
    } catch (e) {
      console.error('応答の解析に失敗しました:', responseBody);
    }
  });
});

req.on('error', (e) => {
  console.error(`リクエストで問題が発生しました: ${e.message}`);
});

req.write(data);
req.end();
