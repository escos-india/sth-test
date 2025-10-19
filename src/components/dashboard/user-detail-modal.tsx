'use client';

import { User } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface UserDetailModalProps {
  user: User;
  onPlanChange: (userId: string, newPlan: User['plan']) => void;
  onStatusChange: (userId: string, newStatus: User['status']) => void;
}

export function UserDetailModal({ user, onPlanChange, onStatusChange }: UserDetailModalProps) {
  const getStatusClass = (status: User['status']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500';
      case 'Banned':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{user.name}</CardTitle>
                <p className="text-sm text-gray-500">{user.email}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Plan</label>
                  <Select defaultValue={user.plan} onValueChange={(newPlan) => onPlanChange(user.id, newPlan as User['plan'])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Free">Free</SelectItem>
                      <SelectItem value="Silver">Silver</SelectItem>
                      <SelectItem value="Gold">Gold</SelectItem>
                      <SelectItem value="Platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <div className="flex items-center space-x-2">
                    <span className={`w-3 h-3 rounded-full ${getStatusClass(user.status)}`}></span>
                    <span>{user.status}</span>
                  </div>
                </div>
                <Button
                  variant={user.status === 'Banned' ? 'default' : 'destructive'}
                  className="w-full"
                  onClick={() => onStatusChange(user.id, user.status === 'Banned' ? 'Active' : 'Banned')}
                >
                  {user.status === 'Banned' ? 'Unban' : 'Ban'} User
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2">
            <Tabs defaultValue="activity">
              <TabsList>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="likes">Likes</TabsTrigger>
              </TabsList>
              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">Oct 26, 2023</div>
                        <div>User logged in</div>
                      </li>
                      <li className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">Oct 25, 2023</div>
                        <div>User created a new post: <strong>My Awesome Post</strong></div>
                      </li>
                      <li className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">Oct 24, 2023</div>
                        <div>User commented on <strong>Another Post</strong></div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="posts" className="mt-4">
                <p>Posts will be shown here.</p>
              </TabsContent>
              <TabsContent value="comments" className="mt-4">
                <p>Comments will be shown here.</p>
              </TabsContent>
              <TabsContent value="likes" className="mt-4">
                <p>Likes will be shown here.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
