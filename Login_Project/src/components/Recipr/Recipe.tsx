import React from 'react';

type RecipeProps = {
  id: number;
  title: string;
  image: string;
  servings?: number;
  ingredients: { [key: string]: string[] };
  instructions: { [key: string]: string[] };
};

const RecipeCard: React.FC<RecipeProps> = ({ title, image, servings, ingredients, instructions }) => {
  return (
    <div style={styles.card}>
      <h2>{title}</h2>
      <img src={image} alt={title} style={styles.image} />
      {servings && <p>מנות: {servings}</p>}

      <h3>רכיבים</h3>
      {Object.entries(ingredients).map(([section, items]) => (
        <div key={section}>
          <h4>{section}</h4>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <h3>הוראות הכנה</h3>
      {Object.entries(instructions).map(([section, steps]) => (
        <div key={section}>
          <h4>{section}</h4>
          <ol>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    maxWidth: '400px',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
  },
};

export default RecipeCard;
