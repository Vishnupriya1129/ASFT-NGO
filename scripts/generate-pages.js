const fs = require('fs');
const path = require('path');

const sections = [
  'hero',
  'announcements', 
  'events', 
  'gallery', 
  'programs', 
  'testimonials', 
  'messages', 
  'users', 
  'audit-logs', 
  'reports', 
  'settings'
];

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Template for main page
function getPageTemplate(section) {
  const title = capitalize(section);
  const label = section === 'hero' ? 'Hero Banner' :
                section === 'announcements' ? 'Announcement' :
                section === 'testimonials' ? 'Testimonial' :
                section === 'audit-logs' ? 'Audit Log' :
                section === 'gallery' ? 'Image' :
                section === 'messages' ? 'Message' :
                section === 'programs' ? 'Program' :
                section === 'settings' ? 'Setting' :
                section.slice(0, -1);
  
  return `import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ${title}Page() {
  const session = await auth();
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0F223D]">${title}</h1>
          <p className="text-gray-600 mt-2">Manage your ${section.replace('-', ' ')} here.</p>
        </div>
        <Link 
          href="/dashboard/${section}/new"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + New ${label}
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
        <p className="text-gray-400">${title} management coming soon...</p>
        <p className="text-sm text-gray-400 mt-2">Database is ready! 🚀</p>
      </div>
    </div>
  );
}`;
}

// Create folders and files
sections.forEach(section => {
  const dir = path.join(process.cwd(), 'src', 'app', 'dashboard', section);
  const filePath = path.join(dir, 'page.tsx');
  
  // Create folder if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created folder: ${section}`);
  }
  
  // Create page.tsx if it doesn't exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, getPageTemplate(section));
    console.log(`✅ Created: ${section}/page.tsx`);
  } else {
    console.log(`⏭️ Skipped (exists): ${section}/page.tsx`);
  }
});

console.log('\n🎉 All pages created successfully!');
console.log('📋 Next steps:');
console.log('1. Create API routes for each section');
console.log('2. Add new/edit forms');
console.log('3. Connect to database');