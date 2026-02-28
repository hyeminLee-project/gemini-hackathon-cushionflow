import { useState, useRef } from "react";
import { ImagePlus, X, ChevronDown, CheckCircle2, ShieldCheck, Loader2, Sparkles, AlertCircle } from "lucide-react";
import { CushionRequestPayload } from "@/lib/types";

const MBTI_TYPES = [
    "INTJ", "INTP", "ENTJ", "ENTP",
    "INFJ", "INFP", "ENFJ", "ENFP",
    "ISTJ", "ISFJ", "ESTJ", "ESFJ",
    "ISTP", "ISFP", "ESTP", "ESFP"
];

const CONTEXTS = [
    "휴가 중 보고", "상사 실수 지적", "긴급 요청",
    "거절 메시지", "사과 메시지", "부탁 메시지"
];

interface CushionFormProps {
    onSubmit: (payload: CushionRequestPayload) => void;
    isLoading: boolean;
    error: string | null;
}

export function CushionForm({ onSubmit, isLoading, error }: CushionFormProps) {
    const [message, setMessage] = useState("");
    const [mbti, setMbti] = useState("INFP");
    const [context, setContext] = useState("휴가 중 보고");
    const [isMbtiOpen, setIsMbtiOpen] = useState(false);

    // Image Upload State
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [imageMimeType, setImageMimeType] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const displayError = error || localError;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
        let file: File | undefined;
        if ('dataTransfer' in e) {
            file = e.dataTransfer.files?.[0];
        } else {
            file = e.target.files?.[0];
        }
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setLocalError("이미지 파일만 업로드 가능합니다.");
            return;
        }
        setLocalError(null);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
            const base64String = (reader.result as string).split(',')[1];
            setImageBase64(base64String);
            setImageMimeType(file.type);
        };
        reader.readAsDataURL(file);
    };

    const clearImage = () => {
        setImagePreview(null);
        setImageBase64(null);
        setImageMimeType(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleConvert = () => {
        setLocalError(null);
        onSubmit({
            originalMessage: message,
            mbti,
            context,
            imageBase64,
            imageMimeType
        });
    };

    return (
        <div className="w-full max-w-3xl space-y-4">
            {/* Top: Message Input */}
            <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md">
                <label className="block text-sm font-semibold text-zinc-400 mb-3">
                    전달할 메시지 (또는 이미지 캡처 첨부)
                </label>
                <div
                    className={`relative p-1 rounded-xl transition-all duration-300 ${isDragging ? "bg-indigo-500/20 border-2 border-dashed border-indigo-400" : ""}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleImageUpload(e); }}
                >
                    {isDragging && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm rounded-xl">
                            <p className="text-indigo-400 font-bold flex items-center gap-2">
                                <ImagePlus className="w-5 h-5 animate-bounce" />
                                이미지를 여기에 놓아주세요
                            </p>
                        </div>
                    )}
                    <textarea
                        className="w-full h-32 bg-transparent border-none text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-0 resize-none text-lg"
                        placeholder="예: 팀장님... 왜 아직도 안 하셨나요? (이미지를 여기로 드래그 앤 드롭 하셔도 됩니다)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    {imagePreview ? (
                        <div className="mt-4 relative inline-block">
                            <img src={imagePreview} alt="Uploaded" className="max-h-32 rounded-lg border border-white/10 opacity-80" />
                            <button
                                onClick={clearImage}
                                className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-md transition-colors"
                                title="이미지 삭제"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="mt-4 flex">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all"
                            >
                                <ImagePlus className="w-4 h-4" />
                                대화 캡처 이미지 첨부
                            </button>
                        </div>
                    )}

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
            </div>

            {/* Bottom Grid: MBTI & Context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* MBTI Selection */}
                <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md relative">
                    <label className="block text-sm font-semibold text-zinc-400 mb-3">수신자 커뮤니케이션 스타일 (MBTI)</label>
                    <div className="relative">
                        <button
                            onClick={() => setIsMbtiOpen(!isMbtiOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-black/40 border border-white/5 hover:bg-black/60 transition-colors text-left"
                        >
                            <span className="font-semibold text-zinc-200">{mbti}</span>
                            <ChevronDown className="w-5 h-5 text-zinc-500" />
                        </button>

                        {isMbtiOpen && (
                            <div className="absolute top-full left-0 mt-2 w-48 max-h-64 overflow-y-auto bg-zinc-800 border border-white/10 rounded-xl shadow-2xl z-50 py-2 custom-scrollbar">
                                {MBTI_TYPES.map((type) => (
                                    <button
                                        key={type}
                                        className={`w-full text-left px-4 py-2 hover:bg-white/5 transition-colors ${mbti === type ? 'text-indigo-400 font-bold bg-indigo-500/10' : 'text-zinc-300'}`}
                                        onClick={() => {
                                            setMbti(type);
                                            setIsMbtiOpen(false);
                                        }}
                                    >
                                        {mbti === type && <CheckCircle2 className="w-4 h-4 inline-block mr-2" />}
                                        {type}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-zinc-500 mt-3 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> {mbti} 스타일에 맞춘 비즈니스 언어 최적화
                    </p>
                </div>

                {/* Context Selection */}
                <div className="p-6 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md">
                    <label className="block text-sm font-semibold text-zinc-400 mb-3">상황 맥락</label>
                    <div className="flex flex-wrap gap-2">
                        {CONTEXTS.map((ctx) => (
                            <button
                                key={ctx}
                                onClick={() => setContext(ctx)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${context === ctx
                                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                                    : 'bg-black/40 border-white/5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                                    }`}
                            >
                                {ctx}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {displayError && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{displayError}</p>
                </div>
            )}

            {/* Action Button */}
            <div className="pt-4 flex justify-center">
                <button
                    onClick={handleConvert}
                    disabled={isLoading}
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500 w-64 shadow-[0_0_40px_rgba(79,70,229,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                            AI 분석 중...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                            쿠션어로 변환하기
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
