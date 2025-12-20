
import dotenv from 'dotenv';
import { exec } from 'child_process';
import path from 'path';

// .envファイルをプロジェクトルートから読み込む
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('❌ .envファイルにGEMINI_API_KEYが設定されていません。');
  process.exit(1);
}

console.log('🔑 APIキーの有効性を確認しています...');

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
const data = {
  contents: [{
    parts: [{
      text: "test"
    }]
  }]
};

// curlコマンドを組み立てる
// シングルクオートで囲むことで、シェルの解釈問題を回避する
const command = `curl -s -X POST -H "Content-Type: application/json" -d '${JSON.stringify(data)}' "${url}"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('コマンド実行エラー:', error.message);
    return;
  }
  if (stderr) {
    console.error('コマンド実行時の標準エラー:', stderr);
    return;
  }

  try {
    const res = JSON.parse(stdout);
    if (res.error) {
      console.error('❌ APIキーが無効か、APIが有効になっていません。');
      console.error('エラー詳細:', res.error.message);
    } else if (res.candidates) {
      console.log('✅ APIキーは有効です！');
    } else {
      console.error('🤔 予期せぬ応答がありました:', stdout);
    }
  } catch (e) {
    console.error('応答の解析に失敗しました:', stdout);
    console.error('解析エラー:', e.message);
  }
});
