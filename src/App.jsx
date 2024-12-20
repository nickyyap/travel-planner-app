import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import useLocalStorage from 'use-local-storage';
import { AuthContext } from './contexts/AuthContext';
import RequireAuth from './components/RequireAuth';
import Navbar from './components/Navbar';
import PackingList from './pages/PackingList';
import ErrorPage from './pages/ErrorPage';
import { TravelContext } from './contexts/TravelContext';
import EditPackingList from './pages/EditPackingList';
import { PlanContext } from './contexts/PlanContext';
import PlanFutureTrip from './pages/PlanFutureTrip';
import EditPlanFutureTrip from './pages/EditPlanFutureTrip';
import TravelDocument from './pages/TravelDocument';
import BucketList from './pages/BucketList';

function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [toPack, setToPack] = useLocalStorage("toPack", []);
  const [toPlan, setToPlan] = useLocalStorage("toPlan", []);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <TravelContext.Provider value={{ toPack, setToPack }}>
        <PlanContext.Provider value={{ toPlan, setToPlan }}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route element={<Login />} path="/login" />
              <Route element={<ErrorPage />} path="*" />
              <Route element={
                <RequireAuth>
                  <Home />
                </RequireAuth>} path="/" />
              <Route element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>} path="/dashboard" />
              <Route element={
                <RequireAuth>
                  <PackingList />
                </RequireAuth>} path="/packinglist" />
              <Route element={
                <RequireAuth>
                  <EditPackingList />
                </RequireAuth>} path="/packinglist/:id" />
              <Route element={
                <RequireAuth>
                  <PlanFutureTrip />
                </RequireAuth>} path="/planfuturetrip" />
              <Route element={
                <RequireAuth>
                  <EditPlanFutureTrip />
                </RequireAuth>} path="/planfuturetrip/:id" />
              <Route element={
                <RequireAuth>
                  <TravelDocument />
                </RequireAuth>} path="/traveldocument" />
              <Route element={
                <RequireAuth>
                  <BucketList />
                </RequireAuth>} path="/bucketlist" />
            </Routes>
          </BrowserRouter>
        </PlanContext.Provider>
      </TravelContext.Provider>
    </AuthContext.Provider>
  )
}

export default App
