import React from "react";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200 pt-16">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div>
                    <div className="flex items-center mb-6">
                        <div className="p-1 mr-0">
                            <div className="bg-blue-900 px-2 py-1 text-white font-bold text-lg rounded-lg shadow-lg shadow-blue-500/80">
                                EM
                            </div>
                        </div>
                        <div className="p-1 ml-0">
                            <div className="bg-black px-2 py-1 text-white font-bold text-lg rounded-lg shadow-lg shadow-blue-500/80">
                                E
                            </div>
                        </div>
                        <span className="text-2xl font-bold tracking-wide">
                            Ed-Michaels Enterprise
                        </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Reliable tools & supplies for mechanics, hydraulics, and automotive
                        needs. Quality and durability you can trust.
                    </p>
                    <div className="flex space-x-4 mt-6">
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Categories</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-primary">Mechanical Tools</a></li>
                        <li><a href="#" className="hover:text-primary">Hydraulic Supplies</a></li>
                        <li><a href="#" className="hover:text-primary">Spare Parts</a></li>
                        <li><a href="#" className="hover:text-primary">Automotive</a></li>
                        <li><a href="#" className="hover:text-primary">Chains & Ropes</a></li>
                        <li><a href="#" className="hover:text-primary">New Arrivals</a></li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><a href="#" className="hover:text-primary">About Us</a></li>
                        <li><a href="#" className="hover:text-primary">Contact</a></li>
                        <li><a href="#" className="hover:text-primary">FAQ</a></li>
                        <li><a href="#" className="hover:text-primary">Shipping & Returns</a></li>
                        <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                    <p className="text-sm text-gray-400 mb-4">
                        Subscribe to our newsletter to get updates on new arrivals and
                        special offers.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button
                            type="submit"
                            className="px-5 py-2 bg-primary rounded-lg text-white font-medium hover:bg-primary/90 transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 mt-12">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-4 md:space-y-0">
                    <p>
                        © {new Date().getFullYear()} Ed-Michaels Enterprise. All rights reserved.
                    </p>
                    <div className="flex items-center space-x-4">
                        <p>Built with ❤️ for quality and trust.</p>
                        <a
                            href="mailto:jonkassa23@gmail.com"
                            className="px-4 py-2 bg-primary text-black rounded-lg font-medium hover:bg-primary/90 transition shadow-md"
                        >
                            Contact Developer
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
