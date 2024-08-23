import React from 'react'
import ContentCreatorCard from '../components/ContentCreatorCard';

export default function ShowCreators(props) {

    const { creators } = props;
    return (
        <section className="ShowCreators">
        <ul className='creatorsList'>
          {creators.map((creator, creatorIndex) => (
            <ContentCreatorCard key={creatorIndex} creator = {creator}></ContentCreatorCard>
            ))}
        </ul>
        </section>
    )

}
