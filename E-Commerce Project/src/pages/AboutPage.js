import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
    <main>
      <PageHero title='About' />
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt='nice desk' />
        <article>
          <div className='title'>
            <h2>our story</h2>
            <div className='underline'></div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              maiores. Labore doloribus laudantium hic sapiente illum
              voluptatibus suscipit consectetur, ullam, voluptatum accusantium
              temporibus unde! Eaque dolorum odio fugiat vel dignissimos ipsa
              facere pariatur architecto vero quis totam consequuntur commodi
              natus veritatis ab animi quidem, perspiciatis ea assumenda labore
              in aliquam officia qui? Sint, cum! Incidunt aliquid expedita quos
              voluptatibus impedit in voluptatem suscipit nostrum unde magni!
              Sunt consectetur accusamus neque error? Provident saepe vitae
              sequi nesciunt velit culpa consequuntur. Deserunt, unde tempora
              molestiae labore reprehenderit repellendus in perferendis animi,
              dolorem odio eos cumque earum id omnis consectetur similique?
              Impedit consectetur dolorum laudantium a veritatis. Reprehenderit
              odio asperiores atque incidunt obcaecati! Est alias sed fugit
              voluptas consequatur esse ea minus quibusdam animi nam dolor
              exercitationem, quae vitae illo odit corporis deleniti veritatis
              saepe perferendis quod cupiditate sit. Cupiditate esse sed labore
              aut quo assumenda explicabo hic nulla? Earum expedita cumque hic.
            </p>
          </div>
        </article>
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
