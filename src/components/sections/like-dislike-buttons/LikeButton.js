import React, { useState, useEffect } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import "../../../styles/global.css";

const variantsForBubble = {
  animationOnCountChange: {
    scale: [0.1, 1.5, 0, 0],
    borderColor: ["#E2264D", "#DD4688", "#CC8EF5"],
    borderWidth: [24, 24, 8, 0, 0, 0, 0, 0],
    transition: {
      duration: 1
    }
  }
};

const variantsForHeart = {
  init: {
    scale: 0,
    transition: { duration: 0.1 }
  },
  end: {
    scale: 1,
    transition: {
      delay: 0.16,
      type: "spring",
      stiffness: 600,
      damping: 20,
      mass: 1
    }
  }
};

const variantsForSparkWrapper = {
  init: (custom) => ({
    rotate: custom,
    scale: 0.8,
    transition: {
      duration: 0
    }
  }),
  end: (custom) => ({
    rotate: custom - 5,
    scale: 1.1,
    transition: {
      duration: 1
    }
  })
};

const variantsForSparkGroup = {
  init: () => ({
    rotate: 20,
    y: 0,
    scale: 0,
    transition: {
      duration: 0,
      delay: 0
    }
  }),
  end: () => ({
    rotate: -360,
    y: -5,
    scale: 0.9,
    transition: {
      duration: 0.24,
      delay: 0.1,
      type: "spring",
      stiffness: 200,
      damping: 40,
      mass: 1
    }
  })
};

const variantsForSpark = {
  init: (custom) => ({
    scale: 1,
    margin: 0,
    // backgroundColor: "yellow",
    backgroundColor: custom[1],
    transition: {
      duration: 0,
      delay: 0
    }
  }),
  end: (custom) => ({
    scale: 0,
    margin: 2,
    // backgroundColor: "red",
    backgroundColor: custom[2],
    transition: {
      duration: custom[0],
      delay: 0.32,
      backgroundColor: {
        duration: 0.5,
        delay: 0.3
      }
    }
  })
};

function LikeButton(props) {
  const controlsForCountChange = useAnimationControls();
  const [likes, setLikes] = useState(Number(props.props.likes));
  const [isContainerHovered, setContainerHovered] = useState(false);
  const COMMENT_URL = `http://localhost:8080/api/v1/comments`;

  useEffect(() => {
    const sequence = async () => {
      await controlsForCountChange.start("init");
      return await controlsForCountChange.start("end");
    };
    if (likes !== 0) {
      controlsForCountChange.start("animationOnCountChange");
      sequence();
    }
  }, [controlsForCountChange, likes]);

  const addEntryClick = () => {
    likeComment()
  };

  const likeComment = async () => {
    try {
      await fetch(COMMENT_URL + `/${props.props.id}/like/${props.props.userId}`, { method: 'PUT' })
      .then((response) => {
          if (response.status == 200)
            setLikes(Number(props.props.likes) + 1)
          else
            dislikeComment()
      })
    } catch (error) {
        console.log("error", error);
    }
  };

  const dislikeComment = async () => {
    try {
      await fetch(COMMENT_URL + `/${props.props.id}/dislike/${props.props.userId}`, { method: 'PUT' })
      .then((response) => {
          if (response.status == 200)
            setLikes(likes - 1)
      })
    } catch (error) {
        console.log("error", error);
    }
  };

  return (
    <motion.div
      className="container"
      onClick={() => addEntryClick()}
      onMouseEnter={() => setContainerHovered(true)}
      onMouseLeave={() => setContainerHovered(false)}
    >
      {sparkSpecs.map((spark) => {
        const customValue = (360 / sparkSpecs.length) * spark.id;

        return (
          <motion.div
            key={spark.id}
            className="sparkWrapper"
            custom={customValue}
            style={{ rotate: (360 / sparkSpecs.length) * spark.id, scale: 0 }}
            variants={variantsForSparkWrapper}
            animate={controlsForCountChange}
          >
            <motion.div
              className="sparkGroup"
              style={{ rotate: 20, scale: 0 }}
              variants={variantsForSparkGroup}
              animate={controlsForCountChange}
            >
              <motion.div
                className="spark sparkA"
                style={{ backgroundColor: spark.childColorA, scale: 0 }}
                variants={variantsForSpark}
                custom={[0.8, spark.childColorA, spark.childColorB]}
                animate={controlsForCountChange}
              />
              <motion.div
                className="spark sparkB"
                style={{ backgroundColor: spark.childColorB, scale: 0 }}
                variants={variantsForSpark}
                custom={[0.32, spark.childColorA, spark.childColorB]}
                animate={controlsForCountChange}
              />
            </motion.div>
          </motion.div>
        );
      })}

      <div className="bubbleWrapper">
        <motion.div
          className="bubble"
          animate={controlsForCountChange}
          variants={variantsForBubble}
        />
      </div>
      <motion.div
        className="heartBackdrop"
        style={{
          backgroundColor: isContainerHovered ? "#DD2E44" : "transparent",
          transform: isContainerHovered ? "scale(2)" : "scale(0)"
        }}
      />
      <HeartIcon
        className="heart"
        initial="end"
        animate={controlsForCountChange}
        variants={variantsForHeart}
        heartColor={likes !== 0 ? "#DD2E44" : "transparent"}
        borderColor={
          isContainerHovered ? "#DD2E44" : likes !== 0 ? "" : "#ff314b"
        }
      />
      <motion.div className="d-inline text-danger ms-2">{likes}</motion.div>
    </motion.div>
  );
}

const sparkSpecs = [
  { id: 1, childColorA: "#CC8EF5", childColorB: "#F2B930" },
  { id: 2, childColorA: "#8CE8C3", childColorB: "#C3B789" },
  { id: 3, childColorA: "#F48EA7", childColorB: "#339EEE" },
  { id: 4, childColorA: "#91D2FA", childColorB: "#B0D5A5" },
  { id: 5, childColorA: "#91D2FA", childColorB: "#B0D5A5" },
  { id: 6, childColorA: "#8CE8C3", childColorB: "#D97ACA" },
  { id: 7, childColorA: "#91D2FA", childColorB: "#D59BF3" }
];

function HeartIcon(props) {
  return (
    <motion.svg
      width={36}
      height={36}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <motion.path
        d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868-3.308 0-6.227 1.633-8.018 4.129-1.791-2.496-4.71-4.129-8.017-4.129-5.45 0-9.868 4.417-9.868 9.868 0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959.17-.721.268-1.469.268-2.242z"
        // fill={`#DD2E44`}
        fill={props.heartColor || `#DD2E44`}
        stroke={props.borderColor || `#DD2E44`}
      />
    </motion.svg>
  );
}

export default LikeButton;
