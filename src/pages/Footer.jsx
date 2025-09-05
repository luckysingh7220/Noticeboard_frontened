export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-gray-100 py-4 mt-auto">

        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} – <span className="font-semibold text-white">Community NoticeBoard</span> | Privacy Policy | Terms of Service
          </p>
  
          <p className="text-sm text-gray-400 mt-2 md:mt-0">
            Made by <span className="font-medium text-white">Lucky</span>
          </p>
        </div>
      </footer>
    );
  }
  