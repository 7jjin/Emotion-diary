import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [originDate, setOriginDate] = useState();

  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  });

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiaray = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      if (targetDiaray) {
        setOriginDate(targetDiaray);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [id.diaryList]);

  return (
    <div>
      {originDate && <DiaryEditor isEdit={true} originDate={originDate} />}
    </div>
  );
};

export default Edit;
