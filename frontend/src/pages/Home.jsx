import { motion } from 'framer-motion';
import { Bot, Shield, Music, Zap } from 'lucide-react';

export default function Home() {
    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/api/auth/login';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl glass-panel"
            >
                <Bot className="w-20 h-20 mx-auto mb-6 text-discord-blurple" />
                <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                    Advanced All-In-One Bot
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                    The ultimate Discord bot featuring advanced moderation, premium music streaming, 
                    reaction roles, and a beautiful web dashboard.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <Shield className="w-8 h-8 text-blue-400 mb-3" />
                        <h3 className="font-semibold text-lg">Moderation</h3>
                        <p className="text-sm text-gray-400">Keep your server safe with advanced auto-mod and logging.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <Music className="w-8 h-8 text-pink-400 mb-3" />
                        <h3 className="font-semibold text-lg">Music System</h3>
                        <p className="text-sm text-gray-400">High quality 24/7 music with Lavalink integration.</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <Zap className="w-8 h-8 text-yellow-400 mb-3" />
                        <h3 className="font-semibold text-lg">Modern Dashboard</h3>
                        <p className="text-sm text-gray-400">Configure everything instantly from our web interface.</p>
                    </div>
                </div>

                <button 
                    onClick={handleLogin}
                    className="btn-primary text-lg px-8 py-3 w-full sm:w-auto"
                >
                    Login with Discord
                </button>
            </motion.div>
        </div>
    );
}
