export default function handler(req, res) {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).json({ error: 'Not authorized' });
    }
  
    res.status(200).json({ message: 'Token is available', token: token });
  }
  