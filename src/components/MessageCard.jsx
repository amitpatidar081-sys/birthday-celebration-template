import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import gsap from 'gsap';
import './MessageCard.css';

function MessageCard({ isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  
  const cardRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const messageContentRef = useRef(null);

  const recipientName = "TANU";
  const senderName = "AMIT";
  const message = `To the most beautiful girl in the world, Happy Birthday!

Every day with you feels like a blessing, and I am so lucky to have you in my life. Today is all about celebrating you, your beautiful smile, and the incredible person you are.

I hope this little digital surprise brings a huge smile to your face. Thank you for being my happiness. I love you endlessly, today and always!`;

  // Handle page transitions
  useEffect(() => {
    if (isActive && !prevIsActive.current) {
      setTimeout(() => setShowConfetti(true), 10);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      prevIsActive.current = isActive;
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const prevIsActive = useRef(isActive);

  useEffect(() => {
    if (!isActive && prevIsActive.current) {
      setTimeout(() => {
        setCurtainsOpened(false);
      }, 10);
      
      if (curtainLeftRef.current && curtainRightRef.current) {
        const resetTimeline = gsap.timeline();
        resetTimeline.to([curtainLeftRef.current, curtainRightRef.current], {
          width: '50%',
          duration: 0.5,
          ease: 'power2.out'
        }).to(cardRef.current, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3
        }, 0);
      }
      setIsOpen(false);
    }
    prevIsActive.current = isActive;
  }, [isActive]);

  const openCard = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    const tl = gsap.timeline();
    
    tl.to(curtainLeftRef.current, {
      width: '0%',
      duration: 1.2,
      ease: 'power4.inOut'
    })
    .to(curtainRightRef.current, {
      width: '0%',
      duration: 1.2,
      ease: 'power4.inOut'
    }, 0)
    .to(cardRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'back.out(1.7)'
    }, '-=0.6')
    .fromTo(messageContentRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.2, ease: 'power2.out' },
      '-=0.2'
    );
  };

  return (
    <div className={`message-card-container ${isActive ? 'active' : ''}`}>
      {!curtainsOpened && (
        <div className="curtains-wrapper" onClick={() => { openCard(); setCurtainsOpened(true); }}>
          <div ref={curtainLeftRef} className="curtain left-curtain">
            <div className="curtain-rope left-rope"></div>
          </div>
          <div ref={curtainRightRef} className="curtain right-curtain">
            <div className="curtain-rope right-rope">
              <span className="pull-me-text">Click to Open ❤️</span>
            </div>
          </div>
        </div>
      )}

      <div ref={cardRef} className={`birthday-card ${isOpen ? 'open' : ''}`}>
        <div className="card-inside" ref={messageContentRef}>
          <h2 className="recipient-title">Dear {recipientName},</h2>
          <div className="heart-divider">
            <Heart className="heart-icon-filled" fill="#ff4b5c" color="#ff4b5c" />
          </div>
          <p className="card-message-text">{message}</p>
          <h3 className="sender-signature">With Love, {senderName}</h3>
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
