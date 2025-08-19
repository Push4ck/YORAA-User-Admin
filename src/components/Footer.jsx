const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
        {/* Brand + Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">YORAA</h3>
          <p className="mt-2">Subscribe to get exclusive updates and events.</p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-l-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-r-md text-sm hover:bg-gray-800 transition"
            >
              Join
            </button>
          </form>
        </div>

        {/* Brand Links */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Brand</h4>
          <ul className="space-y-1">
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Client Services */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Client Services</h4>
          <ul className="space-y-1">
            <li>
              <a href="#">Refund & Cancel Policy</a>
            </li>
            <li>
              <a href="#">Payment Policy</a>
            </li>
            <li>
              <a href="#">Shipping Info</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Track Order</a>
            </li>
            <li>
              <a href="#">Delete Account</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 text-center text-xs text-gray-500 py-4">
        &copy; 2025 YORAA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
