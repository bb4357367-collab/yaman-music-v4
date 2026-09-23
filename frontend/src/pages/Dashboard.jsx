import { useEffect, useState } from 'react';
import axios from 'axios';
import { Settings, Music, Users, LogOut } from 'lucide-react';

export default function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user from API
        axios.get('http://localhost:3000/api/auth/me', { withCredentials: true })
            .then(res => setUser(res.data))
            .catch(() => {
                window.location.href = '/';
            });
    }, []);

    if (!user) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-discord-darkest border-r border-white/5 flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-discord-blurple">Dashboard</h2>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <a href="#" className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg text-white">
                        <Settings className="w-5 h-5" />
                        <span>Overview</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 hover:bg-white/5 p-3 rounded-lg text-gray-400 transition-colors">
                        <Users className="w-5 h-5" />
                        <span>Moderation</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 hover:bg-white/5 p-3 rounded-lg text-gray-400 transition-colors">
                        <Music className="w-5 h-5" />
                        <span>Music Player</span>
                    </a>
                </nav>
                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center space-x-3 mb-4">
                        {user.avatar && (
                            <img src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`} alt="avatar" className="w-10 h-10 rounded-full" />
                        )}
                        <div>
                            <p className="font-semibold">{user.username}</p>
                            <p className="text-xs text-green-400">Online</p>
                        </div>
                    </div>
                    <button className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors w-full p-2">
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <h1 className="text-3xl font-bold mb-6">Welcome back, {user.username}!</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="glass-panel">
                        <h3 className="text-lg font-semibold mb-2">Servers</h3>
                        <p className="text-3xl font-bold text-discord-blurple">{user.guilds.length}</p>
                    </div>
                    <div className="glass-panel">
                        <h3 className="text-lg font-semibold mb-2">Bot Status</h3>
                        <div className="flex items-center space-x-2 text-green-400">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Online & Routing</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
