const canvas = document.getElementById('genCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class particle{
    constructor(){
        this.x=Math.random()*canvas.width;
        this.y=Math.random()*canvas.height;
        this.ox=this.x;
        this.oy=this.y;
        this.weight=Math.random();
        this.size=this.weight*3;
        this.vx=0;
        this.vy=0;
        this.ax=0;
        this.ay=0;``
        let symbols=['@','#','%','$'];
        let index = Math.floor(Math.random()*4)
        this.text = symbols[index];

    }

    update_acceleration(Mx,My,maxD){
        let dx = Mx - this.x;
        let dy = My - this.y;

        let d = Math.sqrt((dx*dx)+(dy*dy));
        if(d<maxD){
        // Calculate the acceleration towards the attractor point
            this.ax = dx * 0.01; // The 0.01 is a scaling factor to control attraction strength
            this.ay = dy * 0.01;
            this.aox = (this.ox-this.x) *0.001;
            this.aoy = (this.oy-this.y) *0.001;
        }
        else {
            this.ax*=0.98;
            this.ay*=0.98;
            this.aox = (this.ox-this.x) *0.001;
            this.aoy = (this.oy-this.y) *0.001;
        }
        
        // Update velocity by adding the acceleration
        this.vx += (this.ax+this.aox)*this.weight;
        this.vy += (this.ay+this.aoy)*this.weight;

        // Optionally, add some damping to prevent the particles from accelerating indefinitely
        this.vx *= 0.95;
        this.vy *= 0.95;

        // Update position by adding the velocity
        this.x += this.vx;
        this.y += this.vy;
        this.color=Math.abs(this.ay)+Math.abs(this.ax);
        }

    update(){

    
        // Calculate the distance (dx, dy) between the particle and the attractor point (Mx, My)
    this.aox = (this.ox-this.x) *0.001;
    this.aoy = (this.oy-this.y) *0.001;

    // Update velocity by adding the acceleration
    this.vx += this.aox*this.weight;
    this.vy += this.aoy*this.weight;

    // Optionally, add some damping to prevent the particles from accelerating indefinitely
    this.vx *= 0.99;
    this.vy *= 0.99;

// Update position by adding the velocity
    this.x += this.vx;
    this.y += this.vy;
    this.color=Math.abs(this.ay)+Math.abs(this.ax)

    
    }

    draw(){
        let symbols=['@','#','%','$'];
        let index = Math.floor(Math.random()*4)
        let text=symbols[index];

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgb('+this.color*100+',0,0)';
        ctx.fill()
        //ctx.fillText(this.text,this.x,this.y);
    }
}

let particles=[];
for(let i=0;i<3000;i++){
    const p = new particle();
    particles.push(p);
}


function update(){
    
}

function main(){
    if (MPresults && MPresults.length > 0) {
        let myHand = MPresults[0];
        let index_tip=myHand[8];
        let thumb_tip=myHand[4];

        ctx.fillStyle='rgba(255,255,255,0.7)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
         index_x = Math.abs(index_tip.x-1) * canvas.width;
         index_y = index_tip.y * canvas.height;
         thumb_x = Math.abs(thumb_tip.x-1) * canvas.width;
         thumb_y = thumb_tip.y * canvas.height;

        let pinchSize = Math.sqrt((index_x-thumb_x)*(index_x-thumb_x)+(index_y-thumb_y)*(index_y-thumb_y))*Math.abs(thumb_tip.z)*0.5;
        pinchSize*=pinchSize;
        console.log(thumb_tip.z)

        particles.forEach((p)=>{
            p.update_acceleration(index_x,index_y,pinchSize);
            p.draw();
        })

        ctx.beginPath();
        ctx.arc(index_x, index_y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        //ctx.fill();
    }
    else{
        ctx.fillStyle='rgba(255,255,255,1)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        particles.forEach((p)=>{
            p.update();
            p.draw();
        })

    }

    requestAnimationFrame(main)

}

main()