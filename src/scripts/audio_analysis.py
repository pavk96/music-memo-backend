import sys
import librosa
import json

def analyze_audio(file_path):
    y, sr = librosa.load(file_path)  # 오디오 파일 로드

    # 비트 감지 (리듬 추출)
    onset_env = librosa.onset.onset_strength(y=y, sr=sr)
    onset_frames = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr)
    onset_times = librosa.frames_to_time(onset_frames, sr=sr)

    # 킥, 스네어, 하이햇 감지 (단순 예제)
    kick_times = [t for t in onset_times if t % 1 < 0.2]
    snare_times = [t for t in onset_times if 0.2 <= t % 1 < 0.5]
    hi_hat_times = [t for t in onset_times if 0.5 <= t % 1]

    result = {
        "onset_times": onset_times.tolist(),
        "kick": kick_times,
        "snare": snare_times,
        "hi_hat": hi_hat_times
    }

    print(json.dumps(result))  # JSON 형식으로 출력 (NestJS에서 처리 가능)

if __name__ == "__main__":
    analyze_audio(sys.argv[1])
