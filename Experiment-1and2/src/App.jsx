import { useState, useMemo } from 'react';
import { Search, Filter, List, LayoutGrid, Briefcase, MapPin, ChevronRight, X, Clock } from 'lucide-react';
import './App.css';

const JOBS_DATA = [
  { id: 1, title: "Senior Product Designer", company: "Linear", location: "Remote", type: "Full-time", salary: "$140k - $180k", tags: ["Design", "Systems"], logo: "L", color: "bg-purple-600" },
  { id: 2, title: "Fullstack Engineer", company: "Vercel", location: "San Francisco, CA", type: "Full-time", salary: "$160k - $210k", tags: ["React", "Next.js"], logo: "V", color: "bg-black" },
  { id: 3, title: "Backend Architect", company: "Stripe", location: "Remote", type: "Contract", salary: "$900/day", tags: ["Node.js", "Ruby"], logo: "S", color: "bg-blue-500" },
  { id: 4, title: "Marketing Lead", company: "Airbnb", location: "New York, NY", type: "Full-time", salary: "$130k - $160k", tags: ["Growth", "Ads"], logo: "A", color: "bg-rose-500" },
];

function App() {

  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter(job => 
      job.title.toLowerCase().includes(search.toLowerCase()) || 
      job.company.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans selection:bg-indigo-100">

      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">J</div>
            <span className="font-bold text-xl tracking-tight">Portal.</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Find Work</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Post a Job</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Salaries</a>
          </div>
          <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all active:scale-95">
            Sign In
          </button>
        </div>
      </nav>

      <header className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Work on things that <span className="text-indigo-600">actually</span> matter.
          </h1>
          <p className="text-lg text-slate-500 mb-8 leading-relaxed">
            A curated job board for developers, designers, and creative minds. No noise, just high-quality opportunities.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-col md:flex-row gap-8">

          <section className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-xl">{filteredJobs.length} open roles</h2>
              <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-slate-100 text-indigo-600' : 'text-slate-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-slate-100 text-indigo-600' : 'text-slate-400'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className={viewMode === 'list' ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
              {filteredJobs.map((job) => (
                <div 
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`group bg-white border border-slate-200 p-5 rounded-2xl hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all cursor-pointer relative overflow-hidden ${viewMode === 'list' ? 'flex items-center justify-between' : 'flex flex-col'}`}
                >
                  <div className="flex items-center gap-5">
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {job.company}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                        <span className="flex items-center gap-1.5 text-indigo-600 font-medium">{job.salary}</span>
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 ${viewMode === 'list' ? 'mt-0' : 'mt-6'}`}>
                    {job.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium italic">#{tag}</span>
                    ))}
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {selectedJob && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedJob(null)} />
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
            <button 
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>

            <div className={`w-16 h-16 ${selectedJob.color} rounded-2xl flex items-center justify-center text-white font-bold text-3xl mb-6`}>
              {selectedJob.logo}
            </div>
            
            <h2 className="text-3xl font-bold mb-2">{selectedJob.title}</h2>
            <div className="flex items-center gap-6 text-slate-500 mb-8 pb-8 border-b border-slate-100">
              <span className="flex items-center gap-2"><Briefcase className="w-5 h-5" /> {selectedJob.company}</span>
              <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {selectedJob.location}</span>
              <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> Posted 2d ago</span>
            </div>

            <div className="prose prose-slate max-w-none">
              <h4 className="text-lg font-bold mb-4">About the role</h4>
              <p className="text-slate-600 leading-relaxed mb-6">
                We are looking for a {selectedJob.title} to join our growing team. You will be responsible for building out the next generation of tools that empower creators worldwide. We value deep work, attention to detail, and a "user-first" mentality.
              </p>
              
              <h4 className="text-lg font-bold mb-4">Responsibilities</h4>
              <ul className="list-disc pl-5 text-slate-600 space-y-2 mb-8">
                <li>Design and implement core features of the platform.</li>
                <li>Collaborate with cross-functional teams to define requirements.</li>
                <li>Maintain high standards of code quality and performance.</li>
                <li>Mentor junior members of the engineering team.</li>
              </ul>
            </div>

            <div className="sticky bottom-0 pt-6 pb-2 bg-white border-t border-slate-100 mt-12 flex gap-4">
              <button className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                Apply for this position
              </button>
              <button className="px-6 py-4 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
