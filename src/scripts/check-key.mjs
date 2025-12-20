// src/scripts/check-key.mjs
import 'dotenv/config';

async function checkApiKey() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ .envファイルにGEMINI_API_KEYが設定されていません。');
    process.exit(1);
  }

  console.log('🔑 APIキーの有効性を確認しています...');

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ "text": "test" }]
        }]
      })
    });
    
    const res = await response.json();

    if (response.ok && res.candidates) {
      console.log('✅ APIキーは有効です！');
    } else if (res.error) {
      console.error('❌ APIキーが無効か、APIが有効になっていません。');
      console.error('エラー詳細:', res.error.message);
    } else {
      console.error('🤔 予期せぬ応答がありました:', JSON.stringify(res, null, 2));
    }
  } catch (error) {
    console.error('コマンド実行中にエラーが発生しました:', error);
  }
}

checkApiKey();
