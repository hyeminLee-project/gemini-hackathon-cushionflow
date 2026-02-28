import { ShieldCheck } from "lucide-react";

export function Header() {
    return (
        <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/30 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white/90">CushionFlow</span>
                </div>
            </div>
        </header>
    );
}
