import '../assets/styles/ValueProposition.css';


const ValueProposition = ({ title, content }) => {

  return (
    <div className='value-section'>
      <h2>{title}</h2>
      <div className='item-container'>
        {content.map((item, index) => (
          <div key={index} className='value-item'>
            {item.image_url &&
              <img
                src={item.image_url}
                alt={`Image for ${item.name}`} />
            }
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ValueProposition