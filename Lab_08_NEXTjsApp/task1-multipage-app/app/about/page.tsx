export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white border-b pb-4">
        About This Application
      </h1>
      
      {/* Styled content section */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 leading-relaxed text-gray-700 dark:text-gray-300 space-y-6 border border-gray-100 dark:border-gray-700">
        <p>
          This application was built as part of a university lab assignment. 
          The goal of the assignment is to demonstrate an understanding of React and Next.js principles, 
          including project setup, component creation, and App Router usage.
        </p>
        <p>
          It features a clean, reusable architecture where common elements like the Header 
          and Footer are abstracted into their own components. The global layout ensures 
          these elements persist across all pages seamlessly.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border-l-4 border-blue-500">
          <h2 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Key Technologies Used:</h2>
          <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-300">
            <li>Next.js (App Router)</li>
            <li>React Server Components</li>
            <li>Tailwind CSS</li>
            <li>TypeScript</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
