import React, { useState, useMemo } from 'react';
import { Home, Grid, List, Package, Edit2, Trash2, ChevronRight, User, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';

function Dashboard() {
  const [categories, setCategories] = useState([
    { id: 123, name: 'Mobile', image: '📱', status: 'Active' },
    { id: 124, name: 'Laptop', image: '💻', status: 'Inactive' },
    { id: 125, name: 'Grocery', image: '🍱', status: 'Inactive' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const filteredData = useMemo(() => {
    let filtered = categories.filter(cat =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [categories, searchTerm, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4 text-purple-700" />
    ) : (
      <ChevronDown className="w-4 h-4 text-purple-700" />
    );
  };

  const handleEdit = (category) => {
    console.log('Edit category:', category);
    alert(`Edit: ${category.name}`);
  };

  const handleDelete = (id) => {
    console.log('Delete category:', id);
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo */}
        <div className="bg-linear-to-r from-purple-700 to-purple-900 p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-purple-700 font-bold text-xl">D</span>
            </div>
            <span className="text-white font-semibold text-xl">digitalflake</span>
          </div>
          <User className="text-white w-6 h-6" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <NavItem icon={<Home />} label="Home" />
          <NavItem icon={<Grid />} label="Category" active />
          <NavItem icon={<List />} label="Subcategory" />
          <NavItem icon={<Package />} label="Products" />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Grid className="w-6 h-6" />
            <h1 className="text-2xl font-semibold">Category</h1>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Add New
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-yellow-100">
                <tr>
                  <th 
                    onClick={() => handleSort('id')}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none hover:bg-yellow-200 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Id
                      {getSortIcon('id')}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('name')}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none hover:bg-yellow-200 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Category name
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Image
                  </th>
                  <th 
                    onClick={() => handleSort('status')}
                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none hover:bg-yellow-200 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((category, index) => (
                  <tr 
                    key={category.id}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">{category.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{category.name}</td>
                    <td className="px-6 py-4 text-3xl">{category.image}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${
                        category.status === 'Active' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {category.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleEdit(category)}
                          className="text-gray-600 hover:text-gray-800 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
                          className="text-gray-600 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <div
      className={`flex items-center justify-between px-6 py-3 cursor-pointer transition-colors ${
        active
          ? 'bg-yellow-100 border-l-4 border-purple-700'
          : 'hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={active ? 'text-purple-700' : 'text-gray-600'}>
          {React.cloneElement(icon, { className: 'w-5 h-5' })}
        </div>
        <span className={`font-medium ${active ? 'text-gray-900' : 'text-gray-700'}`}>
          {label}
        </span>
      </div>
      <ChevronRight className={`w-5 h-5 ${active ? 'text-purple-700' : 'text-gray-400'}`} />
    </div>
  );
}

export default Dashboard;