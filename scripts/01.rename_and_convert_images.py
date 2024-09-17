import os
from PIL import Image, ImageOps
import pillow_heif  # HEICファイルのサポートを追加

# pillow-heifのプラグインをPillowに登録
pillow_heif.register_heif_opener()

# ルートディレクトリのパスを指定
root_dir = r'D:\drive-download-20240911T121340Z-001'  # Windowsのパスをr''で指定

# 対応する画像フォーマット
valid_formats = ['JPEG', 'PNG', 'GIF', 'BMP', 'TIFF', 'WEBP', 'HEIF']

# 001から200までのディレクトリを順に処理
for i in range(1, 201):
    dir_name = f"{i:03d}"  # 001, 002, ..., 200 形式のディレクトリ名
    dir_path = os.path.join(root_dir, dir_name)

    if os.path.isdir(dir_path):
        # ディレクトリ内の全てのファイルを取得
        files = os.listdir(dir_path)

        if files:
            # 最初のファイルを取得
            original_file = files[0]
            original_path = os.path.join(dir_path, original_file)

            # 新しいファイル名を定義
            new_file_name = f"{dir_name}.jpg"
            new_path = os.path.join(dir_path, new_file_name)

            # ファイルが既に存在する場合はスキップ
            if os.path.exists(new_path):
                print(f"Skipping {dir_name}: {new_file_name} already exists.")
                continue

            try:
                # 画像を開き、実際のフォーマットを確認
                img = Image.open(original_path)
                img_format = img.format

                # 実際のフォーマットが対応するフォーマットに含まれるか確認
                if img_format in valid_formats:
                    img = ImageOps.exif_transpose(img).convert('RGB')  # EXIF回転情報を適用してRGBに変換

                    # 画像をJPEG形式で保存
                    img.save(new_path, 'JPEG')
                    print(f"Converted and renamed {original_file} to {new_file_name} in {dir_name}")

                    # 元のファイルを削除
                    os.remove(original_path)
                else:
                    print(f"Skipping {original_file}: unsupported format {img_format}")
            except Exception as e:
                print(f"Error processing {original_file} in {dir_name}: {e}")

print("All files processed.")
