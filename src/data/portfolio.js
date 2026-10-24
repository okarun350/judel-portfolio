export const portfolio = {
  fullName: 'Judel J. Quintero',
  professionalTitle: 'Aspiring IT Professional | Web Developer',
  degreeTitle: 'Bachelor of Science in Industrial Technology',
  headline: 'BACHELOR OF SCIENCE INDUSTRIAL TECHNOLOGY',
  intro:
    "Hi, I'm an aspiring IT professional passionate about web development, system development, and technology-driven solutions. I enjoy transforming ideas into functional, user-friendly applications that solve real-world problems. Through my academic and personal projects, I have gained hands-on experience in developing web-based systems, managing databases, and implementing practical features to improve efficiency and organization. I value continuous learning, problem-solving, and attention to detail. I am eager to apply my technical knowledge, learn from experienced professionals, and contribute to a team where I can grow both personally and professionally. I believe every project is an opportunity to improve my skills, take on new challenges, and create meaningful solutions.",
  about:
    'I am a motivated and enthusiastic IT student with a strong passion for learning and improving my skills. I am always eager to explore new technologies, gain knowledge, and challenge myself to grow both personally and professionally. I can work under pressure, adapt to new situations, and remain focused on completing tasks and achieving goals. I also have good communication and interpersonal skills, allowing me to build positive relationships with classmates, collaborate effectively with others, and contribute to a supportive team environment. I believe that continuous learning, responsibility, and teamwork are essential to becoming a successful IT professional.',
  profileImage: '/images/judel-profile-professional.jpg',
  email: 'judelquintero@gmail.com',
  githubUrl: 'https://github.com/okarun350',
  linkedinUrl: 'https://www.linkedin.com',
  phone: '09948962810',
  resumePath: '',
  publicPortfolioUrl: 'https://your-portfolio-domain.vercel.app',
  tagline: 'Building practical digital solutions for everyday challenges.',
  status: 'Open to Entry-Level IT Opportunities',
  education: [
    {
      program: 'Bachelor of Science in Industrial Technology',
      major: 'Major in Computer Technology',
      school: 'Current Academic Program',
      description:
        'Focused on computer technology, system development, and practical applications of IT in real-world environments.',
    },
  ],
  skillCategories: [
    {
      title: 'Frontend',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
    },
    {
      title: 'Backend',
      skills: ['PHP', 'Basic Laravel'],
    },
    {
      title: 'Database',
      skills: ['MySQL', 'Database Design', 'Supabase'],
    },
    {
      title: 'Tools',
      skills: ['Visual Studio Code', 'Git', 'GitHub', 'Vercel'],
    },
    {
      title: 'Other',
      skills: [
        'QR Code Integration',
        'CRUD Operations',
        'System Analysis',
        'Software Testing',
        'Technical Documentation',
        'Web Development',
        'Project Planning',
      ],
    },
  ],
  projects: [
    {
      title: 'AttendTrack: A Web-Based Event Management Attendance Monitoring System',
      description:
        'A web-based system designed to help manage college events and monitor student attendance more efficiently using student-based QR codes.',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
      features: [
        'Event management',
        'Student registration and user management',
        'Unique student QR codes',
        'QR-based attendance scanning',
        'Time-in and time-out monitoring',
        'Real-time attendance monitoring',
        'Attendance reports and exports',
        'Automated post-event evaluation notifications',
      ],
      liveUrl: '',
      manuscriptUrl: '/documents/attendtrack-manuscript.pdf',
      githubUrl: '',
      image: '/images/attendtrack-attendance.png',
      highlight: 'Academic project',
    },
    {
      title: 'Intramurals Medal Tally System',
      description:
        'A web-based system for recording intramural medalists and maintaining updated medal standings for participating teams.',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
      features: [
        'Recording gold, silver, and bronze medalists',
        'Updating team medal standings',
        'Recording game completion dates and times',
        'Viewing current team rankings',
        'Generating an image of the standings for manual posting on social media',
      ],
      image: '/images/intramurals-medal-tally.png',
      liveUrl: 'https://sideabox.com/intams/display.html',
      githubUrl: '',
      highlight: 'Competition system',
    },
    {
      title: 'Wedding Live Photo Wall',
      description:
        'A live photo wall where wedding guests can upload photos from the celebration to be displayed on a projector or LED wall.',
      technologies: [],
      features: [
        'Photo uploads from wedding guests',
        'Live photo display on a projector or LED wall',
        'A shared way for guests to enjoy moments from the celebration',
      ],
      liveUrl: 'https://wedding-live-photo-wall.vercel.app/',
      githubUrl: '',
      image: '/images/wedding-live-photo-wall.png',
      highlight: 'Event Experience',
    },
  ],
  areasOfInterest: [
    'Web Development',
    'Database Management',
    'Information Systems',
    'System Development',
    'UI/UX and User Experience',
  ],
  strengths: [
    'Adaptability',
    'Teamwork',
    'Problem-solving',
    'Technical learning mindset',
    'Responsibility',
    'Effective communication',
  ],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/okarun350' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  ],
  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ],
  qrCodeNote:
    'Update this portfolio URL in src/data/portfolio.js when the Vercel domain changes.',
};

export default portfolio;
