import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";

/* =====================================================
   MOBILE PAGE
===================================================== */

const Page = ({ children, dark = true }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      viewport={{
        once: false,
        amount: 0.2,
      }}
      style={{
        minHeight: "100%",
        width: "100%",
        maxWidth: "430px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 18px",
        boxSizing: "border-box",
        scrollSnapAlign: "start",
      }}
    >
      <div
        style={{
          width: "100%",

          padding:
            "30px 20px",

          boxSizing: "border-box",

          borderRadius: "20px",

          background: dark
            ? "rgba(15,15,15,0.82)"
            : "rgba(255,255,255,0.94)",

          color: dark ? "#fff" : "#333",

          border:
            "1px solid rgba(212,175,55,0.35)",

          backdropFilter:
            "blur(14px)",

          WebkitBackdropFilter:
            "blur(14px)",

          boxShadow:
            "0 15px 40px rgba(0,0,0,0.3)",

          textAlign: "center",
        }}
      >
        {children}
      </div>
    </motion.section>
  );
};

/* =====================================================
   DIVIDER
===================================================== */

const Divider = () => (
  <div
    style={{
      width: "55%",
      maxWidth: "220px",
      height: "1px",

      margin: "0 auto",

      background:
        "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)",
    }}
  />
);

/* =====================================================
   SCRATCH CARD
===================================================== */

const ScratchCard = ({ children }) => {
  const [revealed, setRevealed] =
    useState(false);

  return (
    <div
      onClick={() =>
        setRevealed(true)
      }
      style={{
        position: "relative",

        width: "100%",
        maxWidth: "270px",

        height: "78px",

        margin: "0 auto",

        borderRadius: "12px",

        overflow: "hidden",

        cursor: "pointer",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        background: "#fff",

        boxShadow:
          "0 8px 25px rgba(0,0,0,0.15)",
      }}
    >
      {children}

      <AnimatePresence>
        {!revealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.08,
            }}
            transition={{
              duration: 0.5,
            }}
            style={{
              position: "absolute",
              inset: 0,

              display: "flex",

              alignItems: "center",

              justifyContent:
                "center",

              background:
                "linear-gradient(135deg,#806548,#d4af37,#806548)",

              color: "#fff",

              fontSize:
                "clamp(0.65rem,3vw,0.8rem)",

              fontWeight: "bold",

              letterSpacing: "1.3px",
            }}
          >
            ✨ TAP TO REVEAL ✨
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* =====================================================
   COUNTDOWN
===================================================== */

const CountdownTimer = ({
  targetDate,
}) => {
  const getTime = () => {
    const difference =
      new Date(targetDate).getTime() -
      Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      ),

      hours: Math.floor(
        (difference /
          (1000 * 60 * 60)) %
        24
      ),

      minutes: Math.floor(
        (difference /
          (1000 * 60)) %
        60
      ),

      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    };
  };

  const [time, setTime] =
    useState(getTime());

  useEffect(() => {
    const timer =
      setInterval(() => {
        setTime(getTime());
      }, 1000);

    return () =>
      clearInterval(timer);
  }, [targetDate]);

  const TimeBox = ({
    value,
    label,
  }) => (
    <div
      style={{
        flex: "1 1 60px",

        minWidth: "55px",

        maxWidth: "70px",

        padding: "9px 5px",

        borderRadius: "9px",

        background:
          "rgba(255,255,255,0.06)",

        border:
          "1px solid rgba(212,175,55,0.25)",
      }}
    >
      <div
        style={{
          color: "#d4af37",

          fontSize:
            "clamp(1.15rem,6vw,1.45rem)",

          fontWeight: "bold",
        }}
      >
        {String(value).padStart(
          2,
          "0"
        )}
      </div>

      <div
        style={{
          color: "#999",

          fontSize: "0.55rem",

          marginTop: "3px",

          textTransform:
            "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );

  return (
    <div>
      <h2
        style={{
          color: "#d4af37",

          fontSize:
            "clamp(1.1rem,5vw,1.4rem)",

          letterSpacing: "2.5px",

          marginBottom: "18px",
        }}
      >
        COUNTDOWN
      </h2>

      <div
        style={{
          display: "flex",

          justifyContent:
            "center",

          gap: "6px",

          width: "100%",
        }}
      >
        <TimeBox
          value={time.days}
          label="Days"
        />

        <TimeBox
          value={time.hours}
          label="Hours"
        />

        <TimeBox
          value={time.minutes}
          label="Minutes"
        />

        <TimeBox
          value={time.seconds}
          label="Seconds"
        />
      </div>
    </div>
  );
};

/* =====================================================
   APP
===================================================== */

const App = () => {
  const [isOpen, setIsOpen] =
    useState(false);

  const [showContent, setShowContent] =
    useState(false);

  const googleMapsLink =
    "https://www.google.com/maps/search/?api=1&query=The+Crystal+Pavilion,+Beverly+Hills,+CA";

  const googleCalendarLink =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Zayd+%26+Layla%27s+Wedding&dates=20261024T220000Z/20261025T030000Z&details=Join+us+to+celebrate+our+wedding!&location=The+Crystal+Pavilion,+Beverly+Hills,+CA";

  const handleOpen = () => {
    setIsOpen(true);

    setTimeout(() => {
      setShowContent(true);
    }, 3000);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#111",
        fontFamily: "Montserrat, Arial, sans-serif",
      }}
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/venue_path.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* Dark overlay */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.18)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* =================================================
          DOORS
      ================================================= */}

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            onClick={handleOpen}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 100,
              display: "flex",
              width: "100%",
              height: "100%",
              perspective: "1200px",
              overflow: "hidden",
              cursor: "pointer",
            }}
          >
            {/* LEFT */}

            <motion.div
              initial={{
                rotateY: 0,
              }}
              exit={{
                rotateY: -110,
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
              }}
              style={{
                width: "50%",

                height: "100%",

                transformOrigin:
                  "left center",

                transformStyle:
                  "preserve-3d",
              }}
            >
              <div
                style={{
                  width: "100%",

                  height: "100%",

                  backgroundImage:
                    "url('/green_door.png')",

                  backgroundSize:
                    "200% 100%",

                  backgroundPosition:
                    "left center",

                  backgroundRepeat:
                    "no-repeat",

                  boxShadow:
                    "inset 0 0 50px rgba(0,0,0,0.6)",
                }}
              />
            </motion.div>

            {/* RIGHT */}

            <motion.div
              initial={{
                rotateY: 0,
              }}
              exit={{
                rotateY: 110,
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
              }}
              style={{
                width: "50%",

                height: "100%",

                transformOrigin:
                  "right center",

                transformStyle:
                  "preserve-3d",
              }}
            >
              <div
                style={{
                  width: "100%",

                  height: "100%",

                  backgroundImage:
                    "url('/green_door.png')",

                  backgroundSize:
                    "200% 100%",

                  backgroundPosition:
                    "right center",

                  backgroundRepeat:
                    "no-repeat",

                  boxShadow:
                    "inset 0 0 50px rgba(0,0,0,0.6)",
                }}
              />
            </motion.div>

            {/* CENTER */}

            <motion.div
              exit={{
                opacity: 0,
              }}
              style={{
                position:
                  "absolute",

                top: "50%",

                left: "50%",

                transform:
                  "translate(-50%,-50%)",

                width: "90%",

                textAlign: "center",

                color: "#fff",

                textShadow:
                  "2px 2px 10px rgba(0,0,0,0.9)",
              }}
            >
              <motion.div
                animate={{
                  opacity: [
                    0.5,
                    1,
                    0.5,
                  ],

                  scale: [
                    0.95,
                    1.05,
                    0.95,
                  ],
                }}
                transition={{
                  duration: 2,

                  repeat: Infinity,
                }}
                style={{
                  fontSize:
                    "clamp(0.9rem,4vw,1.15rem)",

                  letterSpacing:
                    "3px",

                  textTransform:
                    "uppercase",
                }}
              >
                Tap to Open
              </motion.div>

              <div
                style={{
                  marginTop: "8px",

                  color: "#d4af37",

                  fontSize:
                    "clamp(0.65rem,3vw,0.8rem)",

                  letterSpacing:
                    "1.5px",
                }}
              >
                An Invitation Awaits
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =================================================
          CONTENT
      ================================================= */}

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1.2,
            }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              width: "100%",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
              scrollSnapType: "y mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* PAGE 1 */}

            <Page>
              <p
                style={{
                  color: "#aaa",

                  letterSpacing:
                    "2px",

                  textTransform:
                    "uppercase",

                  fontSize:
                    "clamp(0.55rem,2.5vw,0.7rem)",

                  marginBottom:
                    "18px",
                }}
              >
                Together with their families
              </p>

              <h1
                style={{
                  color: "#d4af37",

                  fontFamily:
                    "Georgia, serif",

                  fontSize:
                    "clamp(3rem,15vw,4.8rem)",

                  lineHeight: 1,

                  margin: 0,
                }}
              >
                Zayd

                <br />

                <span
                  style={{
                    fontSize:
                      "clamp(1.5rem,7vw,2rem)",
                  }}
                >
                  &
                </span>

                <br />

                Layla
              </h1>

              <p
                style={{
                  color: "#ccc",

                  fontSize:
                    "clamp(0.65rem,3vw,0.8rem)",

                  lineHeight: 1.7,

                  letterSpacing:
                    "0.8px",

                  textTransform:
                    "uppercase",

                  marginTop:
                    "20px",
                }}
              >
                Request the honor of your
                presence
                <br />
                at the celebration of their
                marriage
              </p>
            </Page>

            <Divider />

            {/* PAGE 2 */}

            <Page dark={false}>
              <h2
                style={{
                  color: "#b8860b",

                  fontFamily:
                    "Georgia, serif",

                  fontSize:
                    "clamp(1.6rem,7vw,2rem)",

                  marginBottom:
                    "12px",
                }}
              >
                The Big Day
              </h2>

              <p
                style={{
                  color: "#555",

                  fontSize:
                    "clamp(0.75rem,3.5vw,0.9rem)",

                  marginBottom:
                    "22px",
                }}
              >
                Tap below to reveal our
                wedding date!
              </p>

              <ScratchCard>
                <h3
                  style={{
                    color: "#7a1f2b",

                    fontFamily:
                      "Georgia, serif",

                    fontSize:
                      "clamp(1.15rem,5vw,1.5rem)",
                  }}
                >
                  October 24, 2026
                </h3>
              </ScratchCard>
            </Page>

            <Divider />

            {/* PAGE 3 */}

            <Page>
              <CountdownTimer
                targetDate="2026-10-24T17:00:00"
              />

              <div
                style={{
                  marginTop:
                    "30px",

                  width: "100%",
                }}
              >
                <h3
                  style={{
                    color: "#d4af37",

                    letterSpacing:
                      "2px",

                    fontSize:
                      "clamp(0.7rem,3vw,0.85rem)",

                    borderBottom:
                      "1px solid rgba(255,255,255,0.15)",

                    paddingBottom:
                      "10px",

                    marginBottom:
                      "18px",
                  }}
                >
                  EVENT ITINERARY
                </h3>

                {[
                  [
                    "5:00 PM",
                    "Baraat & Welcome",
                    "Baraat procession & grand welcome",
                  ],

                  [
                    "6:00 PM",
                    "Sacred Pheras & Ceremony",
                    "Wedding rituals in Crystal Pavilion",
                  ],

                  [
                    "7:30 PM",
                    "Royal Banquet & Dinner",
                    "Gourmet dinner & celebrations",
                  ],
                ].map(
                  (event) => (
                    <div
                      key={event[0]}
                      style={{
                        display:
                          "flex",

                        gap: "12px",

                        textAlign:
                          "left",

                        marginBottom:
                          "18px",
                      }}
                    >
                      <strong
                        style={{
                          width:
                            "62px",

                          flexShrink: 0,

                          color:
                            "#d4af37",

                          fontSize:
                            "clamp(0.65rem,3vw,0.8rem)",
                        }}
                      >
                        {event[0]}
                      </strong>

                      <div>
                        <div
                          style={{
                            fontWeight:
                              "bold",

                            fontSize:
                              "clamp(0.75rem,3.5vw,0.95rem)",
                          }}
                        >
                          {event[1]}
                        </div>

                        <div
                          style={{
                            color:
                              "#999",

                            fontSize:
                              "clamp(0.6rem,2.8vw,0.75rem)",

                            marginTop:
                              "3px",
                          }}
                        >
                          {event[2]}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <a
                href={
                  googleCalendarLink
                }
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop:
                    "10px",

                  width: "100%",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  gap: "8px",

                  padding:
                    "13px",

                  boxSizing:
                    "border-box",

                  borderRadius:
                    "9px",

                  background:
                    "#d4af37",

                  color: "#000",

                  textDecoration:
                    "none",

                  fontWeight:
                    "bold",

                  fontSize:
                    "clamp(0.7rem,3vw,0.85rem)",
                }}
              >
                <Calendar size={17} />

                Add to Calendar
              </a>
            </Page>

            <Divider />

            {/* PAGE 4 */}

            <Page>
              <h3
                style={{
                  color: "#d4af37",

                  letterSpacing:
                    "2px",

                  fontSize:
                    "clamp(0.7rem,3vw,0.85rem)",

                  marginBottom:
                    "18px",
                }}
              >
                VENUE LOCATION
              </h3>

              <h2
                style={{
                  color: "#fff",

                  fontFamily:
                    "Georgia, serif",

                  fontSize:
                    "clamp(1.3rem,6vw,1.7rem)",

                  margin:
                    "8px 0",
                }}
              >
                The Crystal Pavilion
              </h2>

              <p
                style={{
                  color: "#aaa",

                  fontSize:
                    "clamp(0.7rem,3vw,0.85rem)",

                  lineHeight: 1.6,
                }}
              >
                Royal Palm Estate &
                Gardens,
                <br />
                Beverly Hills, CA
              </p>

              <div
                style={{
                  width: "75px",

                  height: "75px",

                  margin:
                    "25px auto",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  borderRadius:
                    "50%",

                  background:
                    "rgba(255,255,255,0.07)",

                  border:
                    "1px solid rgba(212,175,55,0.4)",

                  fontSize:
                    "2rem",
                }}
              >
                🏰
              </div>

              <a
                href={
                  googleMapsLink
                }
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "100%",

                  display:
                    "flex",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  gap: "8px",

                  padding:
                    "13px",

                  boxSizing:
                    "border-box",

                  borderRadius:
                    "9px",

                  background:
                    "#fff",

                  color: "#000",

                  textDecoration:
                    "none",

                  fontWeight:
                    "bold",

                  fontSize:
                    "clamp(0.7rem,3vw,0.85rem)",
                }}
              >
                Open in Google Maps

                <ExternalLink
                  size={17}
                />
              </a>
            </Page>

            <div
              style={{
                height: "25px",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;