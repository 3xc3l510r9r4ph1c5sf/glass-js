# Oro-OS: AI-Powered Graphic Design Operating System

A modern, web-based graphic design platform with integrated AI assistance, featuring a glass-inspired UI reminiscent of macOS and Windows Metro design principles.

## 🌟 Features

### Core Functionality
- **Glass UI Design**: Translucent, blurred backgrounds with rounded corners
- **AI-Powered Chat Widget**: Persistent, draggable chat interface with design assistance
- **Real-time Collaboration**: Multi-user design sessions with live updates
- **Vector Design Tools**: Fabric.js-powered canvas with shapes, text, and images
- **3D Dock Interface**: Animated app launcher with hover effects

### AI Capabilities
- **Design Suggestions**: AI-powered layout and color recommendations
- **Natural Language Processing**: Chat-based design assistance
- **Auto-layout**: Intelligent element arrangement
- **Style Transfer**: Apply design styles automatically

### Technical Features
- **WebGL Acceleration**: Smooth 3D effects and animations
- **Real-time Sync**: Socket.io for live collaboration
- **Responsive Design**: Works across desktop, tablet, and mobile
- **Progressive Web App**: Installable with offline capabilities

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **Framer Motion** - Smooth animations and transitions
- **Three.js** - 3D graphics and WebGL effects
- **Fabric.js** - Canvas-based design tools
- **Tailwind CSS** - Utility-first styling
- **Socket.io Client** - Real-time communication

### Backend
- **Node.js + Express** - Server framework
- **Socket.io** - WebSocket communication
- **CORS** - Cross-origin resource sharing

### AI/ML
- **Transformers.js** - Client-side AI models
- **Xenova/gpt2** - Text generation for chat responses

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/oro-os.git
cd oro-os
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development servers**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server
```

4. **Open your browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
oro-os/
├── src/
│   ├── components/          # React components
│   │   ├── Desktop.jsx      # Desktop environment
│   │   ├── Dock.jsx         # 3D app dock
│   │   ├── ChatWidget.jsx   # AI chat interface
│   │   ├── DesignCanvas.jsx # Design tools
│   │   └── AIAssistant.jsx  # AI integration
│   ├── contexts/            # React contexts
│   │   ├── SocketContext.jsx # WebSocket management
│   │   └── AIContext.jsx     # AI model management
│   └── main.jsx             # App entry point
├── server/
│   └── index.js             # Express server
├── public/                  # Static assets
└── package.json
```

## 🎨 Design System

### Glass Effects
The UI uses a sophisticated glass effect system with:
- **Backdrop blur**: `backdrop-filter: blur(20px)`
- **Translucent backgrounds**: `rgba(255, 255, 255, 0.1)`
- **Subtle borders**: `border: 1px solid rgba(255, 255, 255, 0.2)`
- **Layered shadows**: Multiple shadow layers for depth

### Color Palette
- **Primary**: Oro gold gradient (`#f59e0b` to `#d97706`)
- **Glass**: White with varying opacity (10%-40%)
- **Backgrounds**: Dynamic gradients with animated orbs

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive scaling**: Tailwind's responsive text classes

## 🤖 AI Integration

### Chat Widget Features
- **Draggable Interface**: Move anywhere on screen
- **Persistent State**: Maintains conversation history
- **Real-time Responses**: Powered by Transformers.js
- **Design Context**: Understands design-related queries

### AI Capabilities
```javascript
// Example AI integration
const { generateResponse } = useAI()

const response = await generateResponse(
  "How can I improve the color scheme of my logo?"
)
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file:
```env
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

### Customization
- **Colors**: Edit `tailwind.config.js`
- **Animations**: Modify Framer Motion variants
- **AI Models**: Change model in `AIContext.jsx`

## 🚀 Deployment

### Docker Deployment
```bash
# Build image
docker build -t oro-os .

# Run container
docker run -p 3000:3000 -p 3001:3001 oro-os
```

### Cloud Deployment
- **Frontend**: Deploy to Vercel, Netlify, or similar
- **Backend**: Deploy to Railway, Render, or Heroku
- **Database**: Add PostgreSQL or MongoDB for persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use TypeScript for new features
- Maintain glass UI consistency
- Test AI integrations thoroughly

## 📚 API Reference

### Socket Events
```javascript
// Chat messages
socket.emit('chat_message', { content, type, timestamp })

// Design updates
socket.emit('design_update', { canvasData, userId })

// User presence
socket.emit('user_join', { userId, userName })
```

### REST Endpoints
- `GET /api/health` - Server health check
- `GET /api/users` - Active users count
- `POST /api/designs` - Save design (future)

## 🔮 Roadmap

### Phase 1 (Current)
- [x] Basic glass UI implementation
- [x] AI chat widget
- [x] Design canvas with Fabric.js
- [x] Real-time collaboration

### Phase 2 (Next)
- [ ] Advanced AI features (image generation)
- [ ] User authentication
- [ ] Design templates library
- [ ] Export to multiple formats

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] Plugin system
- [ ] Advanced collaboration tools
- [ ] Cloud storage integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Liquid Glass JS** - Inspiration for glass effects
- **Apple Design** - macOS glass aesthetic
- **Microsoft Fluent** - Metro design principles
- **Open Source Community** - Amazing libraries and tools

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-username/oro-os/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/oro-os/discussions)
- **Email**: support@oro-os.com

---

**Built with ❤️ for the future of web-based design tools**