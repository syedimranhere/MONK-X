"use client";
import { Home, Search, MessageCircle, PlusSquare, User } from "lucide-react";

export default function SidebarLeft() {
    const menuItems = [
        { name: "Home", icon: <Home size={22} /> },
        { name: "Search", icon: <Search size={22} /> },
        { name: "Messages", icon: <MessageCircle size={22} /> },
        { name: "Create", icon: <PlusSquare size={22} /> },
        { name: "Profile", icon: <User size={22} /> },
    ];

    return (
        <div className="flex flex-col justify-between h-screen w-56 bg-black text-white border-r border-zinc-800 px-4 py-6">
            {/* Top Section */}
            <div>
                <h1 className="text-3xl font-bold mb-4 bg-gradient-to-br 
                from-indigo-600  bg-clip-text text-transparent  border-wborder-b    tracking-wide select-none">
                    MonkX
                </h1>


                <nav className="flex flex-col gap-6">
                    {menuItems.map((item, idx) => (
                        <a
                            key={idx}
                            href="#"
                            className="flex items-center gap-3 group hover:text-indigo-400 transition-colors duration-200"
                        >
                            <span className="text-gray-300 group-hover:text-indigo-400">
                                {item.icon}
                            </span>
                            <span className="font-medium hidden md:inline">{item.name}</span>
                        </a>
                    ))}
                </nav>
            </div>


        </div>
    );
}


