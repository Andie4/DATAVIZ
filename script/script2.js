function strToDom(str){
    return document.createRange().createContextualFragment(str).firstChild;
}

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    toSvgPath (){
        return `${this.x} ${this.y}`;
    }

    static fromAngle(angle){
        return new Point(Math.cos(angle), Math.sin(angle));
    }
}   

// /** 
//   *  @property {number[]} data
//   *  @property {SVGPathElement[]} paths
// */

class PieChart extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({mode: 'open'});
        const colors = ["#5F2992", "#D9D9D9", "#7C188D", "#A575D2", "#A854B1", "#000000", ];
        this.data = this.getAttribute('data').split(';').map(v => parseFloat(v));
        const svg = strToDom(`<svg viewBox="-1 -1 3 3">
            <g mask="url(#graphMask)">

            </g>

            <mask  id="graphMask">
                <rect fill="white" x="-1" y="-1" width="3" height="3"/>
                <circle r="0.2" fill="black"/>   
            </mask>
        </svg>`);

        const pathGroup = svg.querySelector('g');
        const maskGroup = svg.querySelector('mask');

        // création des chemins
        this.paths = this.data.map((_, k) => {
            const color = colors[k % colors.length];
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('fill', color);
            pathGroup.appendChild(path);
            return path;
        });

        this.lines = this.data.map((_, k) => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('stroke', 'black');
            line.setAttribute('stroke-width', '0.02');
            line.setAttribute('x1', '0');
            line.setAttribute('y1', '0');
            maskGroup.appendChild(line);
            return line;
        });
    

        shadow.appendChild(svg);
    }

    connectedCallback (){
        const now = Date.now();
        const duration = 1000;
        const draw = () => {
            const t = (Date.now() - now) / duration;
            if (t < 1){
                this.draw(t);
                window.requestAnimationFrame(draw);
            } else {
                this.draw(1);
            }
        }
        window.requestAnimationFrame(draw);
    }

    draw (progress = 1){
        const total = this.data.reduce((acc, v) => acc + v, 0);
        let angle = 0;
        let start = new Point(1, 0);
        for (let k = 0; k < this.data.length; k++){
            const ratio = (this.data[k] / total) * progress; 
            angle +=  ratio* 2 * Math.PI;
            const end = Point.fromAngle(angle);
            const largeFlag = ratio > .5 ? '1' : '0';
            this.paths[k].setAttribute('d', `M 0 0 L  ${start.toSvgPath()} A 1 1 0 ${largeFlag} 1 ${end.toSvgPath()} L 0 0`);
            this.lines[k].setAttribute('x2', end.x);
            this.lines[k].setAttribute('y2', end.y);
            start = end;
        }
        
    }
}

customElements.define('pie-chart', PieChart);




// -----------------------------affichage des données ausurvol------------------------
addEventListener('DOMContentLoaded', affichageDonnees);


// design de l'infobulle
const infoBulle = document.getElementById('infoBulle');
infoBulle.style.position = 'absolute';
infoBulle.style.backgroundColor = '#ad45dd';
infoBulle.style.color = 'white';
infoBulle.style.padding = '5px';
infoBulle.style.borderRadius = '5px';
infoBulle.style.display = 'none';
document.body.appendChild(infoBulle);

// affichage des données au survol
function affichageDonnees() {
    const camemberts = document.querySelectorAll('pie-chart');

    camemberts.forEach(camembert => {
        const parts = camembert.shadowRoot.querySelectorAll('path'); 
         const donnees = camembert.getAttribute('data').split(';'); 
         
        //  au dessus phrase de chat gpt sinon les ; sont vus comme des données ils étaient affichés 

        parts.forEach((part, index) => {
            part.addEventListener('mouseover', (event) => {
                infoBulle.textContent = `${donnees[index]} %`;
                infoBulle.style.left = event.pageX + 10 + 'px';
                infoBulle.style.top = event.pageY + 10 + 'px';

            });

            part.addEventListener('mousemove', (mouseEvent) => {
                infoBulle.style.left = mouseEvent.pageX + 10 + 'px';
                infoBulle.style.top = mouseEvent.pageY + 10 + 'px';
                infoBulle.style.display = 'block';
            });

            part.addEventListener('mouseout', () => {
                infoBulle.style.display = 'none';
                
            });
        });
    });
}
