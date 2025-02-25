import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  return (
    <motion.div
      className="flex flex-col items-center p-6 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Card */}
      <Card className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden transition-transform hover:scale-105">
        <CardContent className="flex flex-col items-center p-6">
          {/* Settings Icon */}
          <motion.div 
            className="absolute top-4 right-4 cursor-pointer p-2 rounded-full hover:bg-gray-200 transition"
            whileHover={{ scale: 1.1 }}
          >
            <Settings size={20} className="text-gray-600" />
          </motion.div>

          {/* Profile Picture */}
          <motion.div 
            className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg transition-all hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
          >
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* User Info */}
          <h2 className="text-xl font-semibold text-gray-800 mt-3">Alex Thompson</h2>
          <p className="text-gray-500 flex items-center gap-1">
            <span className="text-yellow-500">⭐</span> 4.8 Rating
          </p>

          {/* Ride Stats */}
          <div className="flex justify-around w-full mt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-blue-600">12</p>
              <p className="text-gray-500 text-sm">Rides Given</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-blue-600">8</p>
              <p className="text-gray-500 text-sm">Rides Joined</p>
            </div>
          </div>

          {/* Upcoming Ride Section */}
          <motion.div
            className="w-full mt-6 p-4 bg-blue-100 border border-blue-300 rounded-xl flex items-center justify-between cursor-pointer hover:bg-blue-200 transition"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <p className="text-sm text-gray-600">Upcoming Ride</p>
              <p className="font-semibold text-gray-800">Downtown Library → North Campus</p>
              <p className="text-sm text-gray-500">Today, 2:30 PM</p>
            </div>
            <Button className="text-blue-600 border border-blue-600 bg-transparent hover:bg-blue-600 hover:text-white transition">
              View
            </Button>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex justify-between w-full mt-6">
            <motion.button
              className="flex items-center gap-2 text-gray-600 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              whileHover={{ scale: 1.05 }}
            >
              <Settings size={16} /> Settings
            </motion.button>

            <motion.button
              className="flex items-center gap-2 text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              whileHover={{ scale: 1.05 }}
            >
              <LogOut size={16} /> Log Out
            </motion.button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
