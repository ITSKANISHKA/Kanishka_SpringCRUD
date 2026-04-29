import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Pencil, Trash, Filter, Send, GraduationCap, Info } from "lucide-react";
import { nexusVault } from "../api/nexusVault";

// Entry Editor Modal
const RegistryEditor = ({ active, hide, data, onRefresh }) => {
  const [profile, setProfile] = useState({ legalName: "", electronicMail: "", academicStream: "" });
  const [fault, setFault] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (data) {
      setProfile({ legalName: data.legalName, electronicMail: data.electronicMail, academicStream: data.academicStream });
    } else {
      setProfile({ legalName: "", electronicMail: "", academicStream: "" });
    }
    setFault(null);
  }, [data, active]);

  const onConfirm = async (e) => {
    e.preventDefault();
    setFault(null);
    setBusy(true);
    
    try {
      if (data) {
        await nexusVault.updateScholarInfo(data.refId, profile);
      } else {
        await nexusVault.registerScholar(profile);
      }
      onRefresh();
      hide();
    } catch (err) {
      setFault(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={hide}
            className="absolute inset-0 bg-[#022c22]/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="relative w-full max-w-lg bg-[#064e3b] border border-[#6ee7b7]/20 rounded-[2rem] p-10 shadow-2xl overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#fbbf24]/10 blur-[80px] rounded-full" />

            <h2 className="text-3xl font-black text-[#fbbf24] mb-8">
              {data ? "Modify Profile" : "Scholar Enrollment"}
            </h2>

            {fault && (
              <div className="mb-8 p-4 bg-red-900/40 border border-red-500/30 rounded-2xl flex items-center gap-4">
                <Info className="text-red-400 shrink-0" size={20} />
                <p className="text-sm text-red-100">{fault}</p>
              </div>
            )}

            <form onSubmit={onConfirm} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#6ee7b7] uppercase tracking-[0.2em] ml-2">Legal Identity</label>
                <input
                  type="text"
                  required
                  value={profile.legalName}
                  onChange={(e) => setProfile({ ...profile, legalName: e.target.value })}
                  className="w-full bg-[#022c22]/40 border border-[#6ee7b7]/10 rounded-2xl px-6 py-4 text-[#ecfdf5] focus:outline-none focus:border-[#fbbf24]/40 transition-all placeholder:text-[#6ee7b7]/20"
                  placeholder="Official Name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#6ee7b7] uppercase tracking-[0.2em] ml-2">Digital Mailbox</label>
                <input
                  type="email"
                  required
                  value={profile.electronicMail}
                  onChange={(e) => setProfile({ ...profile, electronicMail: e.target.value })}
                  className="w-full bg-[#022c22]/40 border border-[#6ee7b7]/10 rounded-2xl px-6 py-4 text-[#ecfdf5] focus:outline-none focus:border-[#fbbf24]/40 transition-all placeholder:text-[#6ee7b7]/20"
                  placeholder="nexus@academic.org"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#6ee7b7] uppercase tracking-[0.2em] ml-2">Area of Study</label>
                <input
                  type="text"
                  required
                  value={profile.academicStream}
                  onChange={(e) => setProfile({ ...profile, academicStream: e.target.value })}
                  className="w-full bg-[#022c22]/40 border border-[#6ee7b7]/10 rounded-2xl px-6 py-4 text-[#ecfdf5] focus:outline-none focus:border-[#fbbf24]/40 transition-all placeholder:text-[#6ee7b7]/20"
                  placeholder="e.g. Theoretical Physics"
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={hide}
                  className="flex-1 py-4 border border-[#6ee7b7]/10 rounded-2xl text-[#6ee7b7] hover:bg-[#6ee7b7]/5 transition-all font-bold text-sm"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="flex-1 py-4 bg-[#fbbf24] text-[#022c22] rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all font-black text-sm disabled:opacity-50"
                >
                  {busy ? "Processing..." : data ? "Commit Changes" : "Finalize Enrollment"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const ScholarRegistry = () => {
  const [vault, setVault] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter] = useState("");
  const [panelVisible, setPanelVisible] = useState(false);
  const [focusedScholar, setFocusedScholar] = useState(null);

  const syncVault = async () => {
    try {
      setFetching(true);
      const records = await nexusVault.fetchAllScholars();
      setVault(records);
    } catch (err) {
      console.error("Vault access error:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { syncVault(); }, []);

  const onDelete = async (sid) => {
    if (confirm("Proceed with permanent record removal?")) {
      try {
        await nexusVault.removeScholar(sid);
        syncVault();
      } catch (err) {
        alert("Operation aborted: " + err.message);
      }
    }
  };

  const onEdit = (s) => {
    setFocusedScholar(s);
    setPanelVisible(true);
  };

  const onInitEntry = () => {
    setFocusedScholar(null);
    setPanelVisible(true);
  };

  const filteredVault = vault.filter(s => 
    s.legalName.toLowerCase().includes(filter.toLowerCase()) || 
    s.electronicMail.toLowerCase().includes(filter.toLowerCase()) ||
    s.academicStream.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="bg-[#022c22] min-h-screen pt-40 pb-32 px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Portal Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-20">
          <div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
              Academic<span className="text-[#fbbf24]">Vault.</span>
            </h1>
            <p className="text-[#6ee7b7]/60 text-xl font-medium">
              Secure oversight of the scholar community.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
            <div className="relative group">
              <Filter className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6ee7b7]/40 group-focus-within:text-[#fbbf24] transition-colors" />
              <input 
                type="text" 
                placeholder="Query database..." 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full sm:w-72 bg-[#064e3b] border border-[#6ee7b7]/10 rounded-full pl-12 pr-6 py-4 text-sm text-[#ecfdf5] focus:outline-none focus:border-[#fbbf24]/30 transition-all placeholder:text-[#6ee7b7]/20"
              />
            </div>
            <button 
              onClick={onInitEntry}
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#fbbf24] text-[#022c22] hover:shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all hover:-translate-y-1 active:translate-y-0 font-black"
            >
              <UserPlus size={18} />
              <span>Register New</span>
            </button>
          </div>
        </div>

        {/* Record Display */}
        {fetching ? (
          <div className="flex justify-center py-40">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 border-4 border-[#6ee7b7]/10 border-t-[#fbbf24] rounded-full"
            />
          </div>
        ) : filteredVault.length === 0 ? (
          <div className="py-40 text-center bg-[#064e3b]/30 border border-[#6ee7b7]/5 rounded-[3rem]">
            <GraduationCap className="w-16 h-16 text-[#6ee7b7]/10 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-2">Vault Empty</h3>
            <p className="text-[#6ee7b7]/40">No records correspond to the current query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredVault.map((s) => (
              <motion.div
                key={s.refId}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group bg-[#064e3b] border border-[#6ee7b7]/10 rounded-[2.5rem] p-10 hover:border-[#fbbf24]/30 transition-all duration-500 hover:shadow-2xl relative overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#fbbf24]/5 blur-[60px] rounded-full group-hover:bg-[#fbbf24]/10 transition-all" />

                <div className="flex justify-between items-center mb-8">
                  <div className="px-4 py-1 rounded-full bg-[#022c22] text-[#fbbf24] text-[10px] font-black uppercase tracking-widest border border-[#fbbf24]/10">
                    ID: {s.refId}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => onEdit(s)} className="p-3 bg-[#022c22] rounded-2xl text-[#6ee7b7] hover:text-[#fbbf24] transition-colors border border-[#6ee7b7]/5">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => onDelete(s.refId)} className="p-3 bg-[#022c22] rounded-2xl text-[#6ee7b7] hover:text-red-400 transition-colors border border-[#6ee7b7]/5">
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-6 group-hover:text-[#fbbf24] transition-colors">{s.legalName}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-[#6ee7b7]/60">
                    <div className="w-8 h-8 rounded-xl bg-[#022c22] flex items-center justify-center border border-[#6ee7b7]/5">
                      <Send size={12} />
                    </div>
                    <span>{s.electronicMail}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#6ee7b7]/60">
                    <div className="w-8 h-8 rounded-xl bg-[#022c22] flex items-center justify-center border border-[#6ee7b7]/5">
                      <GraduationCap size={12} />
                    </div>
                    <span>{s.academicStream}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <RegistryEditor 
        active={panelVisible} 
        hide={() => setPanelVisible(false)} 
        data={focusedScholar}
        onRefresh={syncVault}
      />
    </section>
  );
};
