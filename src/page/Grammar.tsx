import tenses from "@/constans/database/tenses.json";

const TenseList = () => {
  return (
    <div className="space-y-4">
      {tenses.map((tense) => (
        <div key={tense.tense} className="border p-4 rounded-md shadow">
          <h2 className="text-xl font-bold">
            {tense.name} ({tense.tense})
          </h2>
          <p>
            <strong>Khẳng định:</strong> {tense.structure.affirmative}
          </p>
          <p>
            <strong>Phủ định:</strong> {tense.structure.negative}
          </p>
          <p>
            <strong>Nghi vấn:</strong> {tense.structure.question}
          </p>
          <ul className="list-disc ml-6 mt-2">
            {tense.examples.map((ex, idx) => (
              <li key={idx}>
                <strong>{ex.type}:</strong> {ex.sentence}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
export default TenseList;
