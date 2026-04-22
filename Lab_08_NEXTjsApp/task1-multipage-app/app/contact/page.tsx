export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white border-b pb-4">
        Contact Us
      </h1>
      
      {/* Simple contact information section */}
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
        <div className="mb-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            We'd love to hear from you. Please reach out using the contact information below.
          </p>
        </div>

        <div className="space-y-6 max-w-md mx-auto">
          {/* Email placeholder */}
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4 text-blue-600 dark:text-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.53 4.82a1 1 0 001.1 0L19 8M3 8a2 2 0 012-2h14a2 2 0 012 2m-18 0v10a2 2 0 002 2h14a2 2 0 002-2V8" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
              <p className="text-gray-600 dark:text-gray-400">contact@mynextjsapp.com</p>
            </div>
          </div>

          {/* Phone placeholder */}
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4 text-green-600 dark:text-green-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
              <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
