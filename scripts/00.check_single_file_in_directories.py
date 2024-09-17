import os

# ルートディレクトリのパスを指定
root_dir = r'D:\drive-download-20240911T121340Z-001'  # 実際のパスを指定

# 複数のファイルが存在するディレクトリを抽出
multiple_files_dirs = []

# ルートディレクトリのサブディレクトリを走査
for subdir in os.listdir(root_dir):
    subdir_path = os.path.join(root_dir, subdir)
    
    # サブディレクトリかどうかの確認
    if os.path.isdir(subdir_path):
        # サブディレクトリ内のファイル数をカウント
        files = [f for f in os.listdir(subdir_path) if os.path.isfile(os.path.join(subdir_path, f))]
        
        # ファイルが複数ある場合のみ抽出
        if len(files) > 1:
            multiple_files_dirs.append(subdir_path)

# 抽出結果を表示
if multiple_files_dirs:
    print("Directories with multiple files:")
    for directory in multiple_files_dirs:
        print(directory)
else:
    print("No directories with multiple files found.")
