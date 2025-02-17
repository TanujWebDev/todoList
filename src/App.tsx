import React, { useState } from 'react';
import { 
  Dumbbell, 
  Users, 
  Target, 
  CheckCircle2, 
  Plus,
  Edit3,
  Trash2,
  Calendar,
  TrendingUp,
  X,
  ArrowUp,
  ArrowDown,
  Activity
} from 'lucide-react';

interface Workout {
  id: string;
  name: string;
  calories: number;
  completed: boolean;
  date: string;
}

interface Friend {
  id: string;
  name: string;
  workouts: number;
  progress: number;
}

interface WorkoutProgress {
  name: string;
  progress: number;
}

function App() {
  const [activeTab, setActiveTab] = useState('workouts');
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: '1',
      name: 'Push-ups',
      calories: 100,
      completed: false,
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: '2',
      name: 'Running',
      calories: 300,
      completed: true,
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: '3',
      name: 'Squats',
      calories: 150,
      completed: false,
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: '4',
      name: 'Cycling',
      calories: 400,
      completed: false,
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: '5',
      name: 'Plank',
      calories: 80,
      completed: true,
      date: new Date().toISOString().split('T')[0]
    }
  ]);

  const [friends, setFriends] = useState<Friend[]>([]);
  const [showAddWorkout, setShowAddWorkout] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newWorkout, setNewWorkout] = useState({ name: '', calories: '' });
  const [newFriend, setNewFriend] = useState({ name: '' });
  const [goalType, setGoalType] = useState<'loss' | 'gain'>('loss');

  const workoutProgress: WorkoutProgress[] = [
    { name: 'Strength Training', progress: 65 },
    { name: 'Cardio', progress: 80 },
    { name: 'Flexibility', progress: 45 },
    { name: 'Endurance', progress: 70 }
  ];

  const weightLossDiet = {
    breakfast: 'Oatmeal with fruits (300 cal)',
    lunch: 'Grilled chicken salad (400 cal)',
    dinner: 'Salmon with vegetables (500 cal)',
    snacks: 'Nuts and yogurt (200 cal)',
    total: 1400
  };

  const weightGainDiet = {
    breakfast: 'Protein smoothie with oats (500 cal)',
    lunch: 'Rice with chicken breast and avocado (700 cal)',
    dinner: 'Steak with sweet potato (800 cal)',
    snacks: 'Protein bar and banana (400 cal)',
    total: 2400
  };

  const toggleWorkout = (id: string) => {
    setWorkouts(workouts.map(workout => 
      workout.id === id ? { ...workout, completed: !workout.completed } : workout
    ));
  };

  const handleAddWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWorkout.name && newWorkout.calories) {
      const workout: Workout = {
        id: Date.now().toString(),
        name: newWorkout.name,
        calories: parseInt(newWorkout.calories),
        completed: false,
        date: new Date().toISOString().split('T')[0]
      };
      setWorkouts([...workouts, workout]);
      setNewWorkout({ name: '', calories: '' });
      setShowAddWorkout(false);
    }
  };

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFriend.name) {
      const friend: Friend = {
        id: Date.now().toString(),
        name: newFriend.name,
        workouts: 0,
        progress: 0
      };
      setFriends([...friends, friend]);
      setNewFriend({ name: '' });
      setShowAddFriend(false);
    }
  };

  const deleteWorkout = (id: string) => {
    setWorkouts(workouts.filter(workout => workout.id !== id));
  };

  const deleteFriend = (id: string) => {
    setFriends(friends.filter(friend => friend.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Dumbbell className="w-8 h-8" />
              <h1 className="text-2xl font-bold">FitTrack</h1>
            </div>
            <div className="flex space-x-4">
              <button 
                className={`px-4 py-2 rounded-lg transition ${activeTab === 'workouts' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                onClick={() => setActiveTab('workouts')}
              >
                Workouts
              </button>
              <button 
                className={`px-4 py-2 rounded-lg transition ${activeTab === 'friends' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                onClick={() => setActiveTab('friends')}
              >
                Friends
              </button>
              <button 
                className={`px-4 py-2 rounded-lg transition ${activeTab === 'goals' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                onClick={() => setActiveTab('goals')}
              >
                Goals
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Add Workout Modal */}
        {showAddWorkout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Add New Workout</h3>
                <button 
                  onClick={() => setShowAddWorkout(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleAddWorkout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Workout Name</label>
                  <input
                    type="text"
                    value={newWorkout.name}
                    onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Calories</label>
                  <input
                    type="number"
                    value={newWorkout.calories}
                    onChange={(e) => setNewWorkout({ ...newWorkout, calories: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Add Workout
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add Friend Modal */}
        {showAddFriend && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Add New Friend</h3>
                <button 
                  onClick={() => setShowAddFriend(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleAddFriend} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Friend's Name</label>
                  <input
                    type="text"
                    value={newFriend.name}
                    onChange={(e) => setNewFriend({ ...newFriend, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Add Friend
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'workouts' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Today's Workouts</h2>
              <button 
                onClick={() => setShowAddWorkout(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Add Workout</span>
              </button>
            </div>

            <div className="grid gap-4">
              {workouts.map(workout => (
                <div key={workout.id} className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => toggleWorkout(workout.id)}
                      className={`p-2 rounded-full ${workout.completed ? 'text-green-500' : 'text-gray-400'}`}
                    >
                      <CheckCircle2 className="w-6 h-6" />
                    </button>
                    <div>
                      <h3 className="font-medium text-gray-800">{workout.name}</h3>
                      <p className="text-sm text-gray-500">{workout.calories} calories</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => deleteWorkout(workout.id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'friends' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Friends' Progress</h2>
              <button 
                onClick={() => setShowAddFriend(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition"
              >
                <Plus className="w-5 h-5" />
                <span>Add Friend</span>
              </button>
            </div>
            
            {friends.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No friends added yet. Add your first friend to start tracking their progress!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {friends.map(friend => (
                  <div key={friend.id} className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{friend.name}</h3>
                          <p className="text-sm text-gray-500">{friend.workouts} workouts this week</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-green-500" />
                          <span className="text-green-500 font-medium">{friend.progress}%</span>
                        </div>
                        <button 
                          onClick={() => deleteFriend(friend.id)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${friend.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">Weight Goals</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setGoalType('loss')}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition ${
                    goalType === 'loss' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <ArrowDown className="w-5 h-5" />
                  <span>Weight Loss</span>
                </button>
                <button
                  onClick={() => setGoalType('gain')}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition ${
                    goalType === 'gain' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <ArrowUp className="w-5 h-5" />
                  <span>Weight Gain</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Progress */}
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Current Progress</h3>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Target className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Current Weight</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {goalType === 'loss' ? '75 kg' : '65 kg'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Target Weight</p>
                      <p className="text-2xl font-bold text-gray-800">
                        {goalType === 'loss' ? '70 kg' : '75 kg'}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-indigo-600 rounded-full h-2 transition-all duration-500"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 text-right">60% to goal</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">Workout Progress</h3>
                  {workoutProgress.map((workout, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{workout.name}</span>
                        <span className="text-gray-900 font-medium">{workout.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 rounded-full h-2 transition-all duration-500"
                          style={{ width: `${workout.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diet Plan */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-800">Suggested Diet Plan</h3>
                    <div className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                      {goalType === 'loss' ? weightLossDiet.total : weightGainDiet.total} cal/day
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Breakfast</h4>
                      <p className="text-sm text-gray-600">
                        {goalType === 'loss' ? weightLossDiet.breakfast : weightGainDiet.breakfast}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Lunch</h4>
                      <p className="text-sm text-gray-600">
                        {goalType === 'loss' ? weightLossDiet.lunch : weightGainDiet.lunch}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Dinner</h4>
                      <p className="text-sm text-gray-600">
                        {goalType === 'loss' ? weightLossDiet.dinner : weightGainDiet.dinner}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">Snacks</h4>
                      <p className="text-sm text-gray-600">
                        {goalType === 'loss' ? weightLossDiet.snacks : weightGainDiet.snacks}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-medium text-indigo-800 mb-2">Tips for {goalType === 'loss' ? 'Weight Loss' : 'Weight Gain'}</h4>
                    <ul className="text-sm text-indigo-600 space-y-2">
                      {goalType === 'loss' ? (
                        <>
                          <li>• Maintain a caloric deficit of 500-750 calories</li>
                          <li>• Drink water before meals to feel fuller</li>
                          <li>• Include protein in every meal</li>
                          <li>• Avoid processed foods and sugary drinks</li>
                        </>
                      ) : (
                        <>
                          <li>• Eat 500-700 calories above maintenance</li>
                          <li>• Consume protein-rich foods every 3-4 hours</li>
                          <li>• Include healthy fats in your diet</li>
                          <li>• Focus on nutrient-dense whole foods</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;