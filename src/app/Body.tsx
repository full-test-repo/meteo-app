import { useTranslation } from "react-i18next";
import { useCtx } from "./AppHooks";

export default () => {
  const { weather, mode } = useCtx();
  const { t } = useTranslation();
  return (
    <div>
      <div>{JSON.stringify(weather)}</div>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="ion"
      />
    </div>
  );
};
