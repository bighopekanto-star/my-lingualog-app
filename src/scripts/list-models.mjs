// src/scripts/list-models.mjs
import 'dotenv/config';

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ .envファイルにGEMINI_API_KEYが設定されていません。');
    process.exit(1);
  }

  console.log('🔑 利用可能なモデルのリストを取得しています...');

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ APIサーバーへのリクエストに失敗しました: ${response.status} ${response.statusText}`);
      console.error('エラー詳細:', errorText);
      process.exit(1);
    }
    
    const data = await response.json();

    if (data.models && data.models.length > 0) {
      console.log('✅ 利用可能なモデル一覧:\n');
      data.models.forEach(model => {
        // 'generateContent' をサポートしているモデルのみ表示
        if (model.supportedGenerationMethods.includes('generateContent')) {
          console.log(`- ${model.name}`);
        }
      });
      console.log('\n上記のモデル名を src/ai/genkit.ts や src/ai/translate.ts に設定してください。');
    } else {
      console.log('🤔 利用可能なモデルが見つかりませんでした。');
      console.log('応答データ:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
}

listModels();
