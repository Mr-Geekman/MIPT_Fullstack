import React, {Component} from 'react';
import React from 'react';
import './styles.css';

class Main extends Component {
    render() {
        return (
            <div className="content">
                <nav className="content-nav">
                    <h3>Content navigation</h3>
                    <ul>
                        <li><a href="#what_is">What is skyscraper</a></li>
                        <li><a href="#biggest_table">The biggest
                            skyscrapers</a></li>
                        <li><a href="#burj_khalifa">Burj Khalifa</a></li>
                    </ul>
                </nav>
                <main>
                    <article>
                        <h1>Skyscrapers</h1>
                        <a name="what_is">
                            <h2>What is skyscraper</h2>
                        </a>
                        <p>
                            A skyscraper is a continuously habitable high-rise
                            building that has over 40 floors and is taller than
                            approximately 150 m (492 ft). Historically, the
                            term
                            first referred to buildings with 10 to 20 floors in
                            the 1880s. The definition shifted with advancing
                            construction technology during the 20th century.
                            Skyscrapers may host offices, residential spaces,
                            and retail spaces. For buildings above a height of
                            300 m (984 ft), the term supertall skyscrapers can
                            be used, while skyscrapers reaching beyond 600 m
                            (1,969 ft) are classified as megatall skyscrapers.
                        </p>
                        <a name="biggest_table">
                            <h2>The biggest skyscrapers</h2>
                        </a>
                        <table>
                            <tr>
                                <th>Structure</th>
                                <th>Country</th>
                                <th>City</th>
                                <th>Height</th>
                                <th>Built</th>
                                <th>Rank</th>
                            </tr>
                            <tr>
                                <td>Burj Khalifa</td>
                                <td>UAE</td>
                                <td>Dubai</td>
                                <td>829m</td>
                                <td>2010</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Clock Tower Hotel</td>
                                <td>Saudi Arabia</td>
                                <td>Mecca</td>
                                <td>601m</td>
                                <td>2012</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <td>Taipei 101</td>
                                <td>Taiwan</td>
                                <td>Taipei</td>
                                <td>509m</td>
                                <td>2004</td>
                                <td>3</td>
                            </tr>
                            <tr>
                                <td>Financial Center</td>
                                <td>China</td>
                                <td>Shanghai</td>
                                <td>492m</td>
                                <td>2008</td>
                                <td>4</td>
                            </tr>
                        </table>
                        <a name="burj_khalifa">
                            <h2>Burj Khalifa</h2>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Burj_Khalifa.jpg/240px-Burj_Khalifa.jpg"
                                alt="Burj Khalifa"></img>
                            <p>
                                The Burj Khalifa, known as the Burj Dubai prior
                                to its inauguration in 2010, is a skyscraper in
                                Dubai, United Arab Emirates. With a total
                                height
                                of 829.8 m (2,722 ft) and a roof height
                                (excluding antenna) of 828 m (2,717 ft), the
                                Burj
                                Khalifa has been the tallest structure and
                                building in the world since its topping out in
                                2009.
                            </p>
                        </a>
                    </article>
                </main>
                <aside class="widgets"></aside>
                <section className="email_section">
                    <h3>Subscribe to our news</h3>
                    <form className="email_form" action="">
                        <input type="text" placeholder="Name" name="name"
                               required></input>
                        <input type="text" placeholder="Email address"
                               name="mail" required></input>
                        <button type="submit" value="Subscribe">Subscribe
                        </button>
                    </form>
                </section>
            </div>
        );
    }
}
