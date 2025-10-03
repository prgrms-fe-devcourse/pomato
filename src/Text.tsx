export default function text() {
  return (
    <>
      {/* Label 사용 예시 */}
      <p className="paragraph-text-l">paragraph(Large)</p>
      <p className="paragraph-text-m">paragraph(Medium)</p>
      <p className="paragraph-text-s">paragraph(Small)</p>
      <br />
      {/* Label 사용 예시 */}
      <p className="label-text-l">Large Label (Bold)</p>
      <p className="label-text-l-semibold ">Large Label (SemiBold)</p>
      <p className="label-text-l-bold">Large Label (Medium)</p>
      <br />
      <p className="label-text-m">Large Label (Bold)</p>
      <p className="label-text-m-semibold ">Large Label (SemiBold)</p>
      <p className="label-text-m-bold">Large Label (Medium)</p>
      <br />
      <p className="label-text-s">Large Label (Bold)</p>
      <p className="label-text-s-semibold ">Large Label (SemiBold)</p>
      <p className="label-text-s-bold">Large Label (Medium)</p>
      <br />
      <p className="label-text-xs">Large Label (Bold)</p>
      <p className="label-text-xs-semibold ">Large Label (SemiBold)</p>
      <p className="label-text-xs-bold">Large Label (Medium)</p>
      <br />
      {/* Heading 사용 예시 */}
      <h1 className="heading-text-l">Large Heading</h1>
      <h2 className="heading-text-m">Medium Heading</h2>
      <h3 className="heading-text-s">Small Heading</h3>
      <h4 className="heading-text-xs">XSmall Heading</h4>
    </>
  );
}
