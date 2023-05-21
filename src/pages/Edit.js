import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiartStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [originDate, setOriginDate] = useState();

  const diaryList = useContext(DiartStateContext);

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
