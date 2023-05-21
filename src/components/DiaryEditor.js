import { useNavigate } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import EmotionItem from "./EmotionItem";
import { DiartDispatchContext, DiartStateContext } from "../App";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔찍함",
  },
];

// 시간 형식 변경
const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = ({ isEdit, originDate }) => {
  const contentRef = useRef();
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));
  const [content, setContent] = useState("");

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate();

  const { onCreate, onEdit } = useContext(DiartDispatchContext);
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originDate.id, date, content, emotion);
      }
    }

    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originDate.date))));
      setEmotion(originDate.emotion);
      setContent(originDate.content);
    }
  }, [isEdit, originDate]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)} />
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            ></input>
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box_emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땟나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
