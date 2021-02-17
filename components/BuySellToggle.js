export default function BuySellToggle(props) {
  const { buySellToggleState, onChange } = props;

  return (
    <div className={"button-cover"}>
      <div className={"button b2"} id="button-10">
        <input
          type="checkbox"
          className={"checkbox"}
          checked={buySellToggleState}
          onChange={onChange}
        />
        <div className={"knobs"}>
          <span>Sell</span>
        </div>
        <div className={"layer"}></div>
      </div>
    </div>
  );
}
