import 'dotenv/config';

async function checkApiKey() {
  console.log('🔑 APIキーの有効性を確認しています...');
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ .envファイルにGEMINI_API_KEYが設定されていません。');
    process.exit(1);
  }

  const model = 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "test" }] }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('❌ APIキーが無効か、APIが有効になっていません。');
      console.error('エラー詳細:', data.error.message);
    } else if (data.candidates) {
      console.log('✅ APIキーは有効です！');
    } else {
      console.error('🤔 予期せぬ応答がありました:', JSON.stringify(data));
    }
  } catch (error) {
    console.error('リクエスト中にエラーが発生しました:', error);
  }
}

checkApiKey();
