
import 'dotenv/config';
import fetch from 'node-fetch';

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('❌ .envファイルにGEMINI_API_KEYが設定されていません。');
    process.exit(1);
  }

  console.log('🔍 利用可能なモデルのリストを取得しています...');

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('❌ APIキーが無効か、APIが有効になっていません。');
      console.error('エラー詳細:', data.error.message);
      return;
    }

    if (data.models && data.models.length > 0) {
      console.log('✅ 利用可能なモデル一覧:');
      const supportedModels = data.models.filter(model => 
        model.supportedGenerationMethods && model.supportedGenerationMethods.includes('generateContent')
      );
      
      if (supportedModels.length > 0) {
        supportedModels.forEach(model => {
          console.log(`- ${model.name} (表示名: ${model.displayName})`);
        });
        console.log('\n💡 上記のリスト（models/gemini-... の形式）からモデル名をコピーし、次のステップで私に教えてください。');
      } else {
        console.log('🤔 generateContent をサポートするモデルが見つかりませんでした。');
      }

    } else {
      console.error('🤔 予期せぬ応答がありました:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('リクエストの実行中にエラーが発生しました:', error);
  }
}

listModels();
