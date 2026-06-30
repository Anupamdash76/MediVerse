const examples = [

  "I've had fever and chills since yesterday.",

  "Headache with vomiting and dizziness.",

  "Chest pain while walking upstairs.",

  "Persistent cough and sore throat.",

];

export default function ExamplePrompt({
  onSelect,
}) {

  return (

    <div className="mt-8">

      <h3 className="mb-4 font-semibold text-slate-700">

        Try one of these examples

      </h3>

      <div className="flex flex-wrap gap-3">

        {examples.map((example) => (

          <button
            key={example}
            onClick={() => onSelect(example)}
            className="
              rounded-full
              border
              border-blue-200
              bg-blue-50
              px-4
              py-2
              text-sm
              text-blue-700
              transition
              hover:bg-blue-100
            "
          >

            {example}

          </button>

        ))}

      </div>

    </div>

  );

}