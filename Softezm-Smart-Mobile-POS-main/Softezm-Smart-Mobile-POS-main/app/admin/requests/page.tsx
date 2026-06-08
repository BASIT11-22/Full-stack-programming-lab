'use client';

import { useStore } from '@/lib/store';
import { useStoreHydration } from '@/hooks/use-store-hydration';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Check, X, Clock, Mail, Lock, User } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function RequestsPage() {
  const { requests, updateRequestStatus } = useStore();
  const isHydrated = useStoreHydration();

  const handleAction = (id: string, status: 'approved' | 'rejected') => {
    updateRequestStatus(id, status);
    toast.success(`Request ${status} successfully`);
  };

  if (!isHydrated) return null;

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const pastRequests = requests.filter(r => r.status !== 'pending');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-8 max-w-5xl mx-auto"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-foreground uppercase tracking-tight">Credential Requests</h1>
        <p className="text-muted-foreground uppercase text-xs font-bold tracking-widest">Approve or reject owner security changes</p>
      </div>

      {/* Pending Requests */}
      <div className="space-y-4">
        <h2 className="text-lg font-black text-foreground uppercase tracking-tight flex items-center gap-2">
          <Clock className="text-orange-500" size={20} />
          Pending Approval ({pendingRequests.length})
        </h2>

        {pendingRequests.length === 0 ? (
          <Card className="p-12 text-center border-dashed border-2 border-border bg-muted/20">
            <ShieldCheck className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="text-muted-foreground font-bold uppercase text-sm tracking-widest">No pending requests</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pendingRequests.map((request) => (
              <motion.div
                key={request.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="p-6 border-none shadow-xl shadow-primary/5 hover:shadow-primary/10 transition-all group">
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <User size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground uppercase tracking-tight">{request.ownerName}</h3>
                          <p className="text-[10px] text-muted-foreground font-black tracking-widest uppercase">
                            Requested {format(request.timestamp, 'MMM dd, hh:mm a')}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50">
                        {request.newEmail && (
                          <div className="space-y-1">
                            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                              <Mail size={10} /> New Email
                            </span>
                            <p className="text-sm font-bold text-primary truncate">{request.newEmail}</p>
                          </div>
                        )}
                        {request.newPassword && (
                          <div className="space-y-1">
                            <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                              <Lock size={10} /> New Password
                            </span>
                            <p className="text-sm font-bold text-foreground font-mono">••••••••</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest ml-1">Reason</span>
                        <p className="text-sm text-foreground bg-background p-3 rounded-xl border border-border/50 italic">
                          "{request.reason}"
                        </p>
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-2 justify-end">
                      <Button
                        onClick={() => handleAction(request.id, 'approved')}
                        className="flex-1 lg:w-32 h-12 bg-green-600 hover:bg-green-700 text-white font-black rounded-xl uppercase tracking-tight gap-2"
                      >
                        <Check size={18} />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleAction(request.id, 'rejected')}
                        variant="outline"
                        className="flex-1 lg:w-32 h-12 text-red-500 border-red-500/20 hover:bg-red-500/10 font-black rounded-xl uppercase tracking-tight gap-2"
                      >
                        <X size={18} />
                        Reject
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* History */}
      {pastRequests.length > 0 && (
        <div className="space-y-4 pt-4">
          <h2 className="text-lg font-black text-foreground uppercase tracking-tight">Request History</h2>
          <div className="grid grid-cols-1 gap-3">
            {pastRequests.slice(0, 10).map((request) => (
              <Card key={request.id} className="p-4 border-none bg-muted/20 opacity-80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      request.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {request.status === 'approved' ? <Check size={16} /> : <X size={16} />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground uppercase tracking-tight">
                        {request.ownerName} <span className="text-muted-foreground font-normal lowercase">— {request.status}</span>
                      </p>
                      <p className="text-[9px] text-muted-foreground font-black tracking-widest uppercase">
                        {format(request.timestamp, 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-muted-foreground font-black tracking-widest uppercase">
                      {request.newEmail ? 'Email' : ''} {request.newEmail && request.newPassword ? '&' : ''} {request.newPassword ? 'Password' : ''}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
