export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-4 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          
          {/* Left side - Copy */}
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} – <span className="font-semibold text-white">Community NoticeBoard</span> | Privacy Policy | Terms of Service
          </p>
  
          {/* Right side - Signature */}
          <p className="text-sm text-gray-400 mt-2 md:mt-0">
            Made by <span className="font-medium text-white">Lucky</span>
          </p>
        </div>
      </footer>
    );
  }
  