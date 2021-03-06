!function(){"use strict";function t(t,e,r){this.blocks=[],this.s=[],this.padding=e,this.outputBits=r,this.reset=!0,this.block=0,this.start=0,this.blockCount=1600-(t<<1)>>5,this.byteCount=this.blockCount<<2,this.outputBlocks=r>>5,this.extraBytes=(31&r)>>3;for(var o=0;50>o;++o)this.s[o]=0}var e="object"==typeof window?window:{},r=!e.JS_SHA3_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;r&&(e=global);for(var o=!e.JS_SHA3_NO_COMMON_JS&&"object"==typeof module&&module.exports,s="0123456789abcdef".split(""),i=[31,7936,2031616,520093696],n=[1,256,65536,16777216],a=[6,1536,393216,100663296],u=[0,8,16,24],h=[1,0,32898,0,32906,2147483648,2147516416,2147483648,32907,0,2147483649,0,2147516545,2147483648,32777,2147483648,138,0,136,0,2147516425,0,2147483658,0,2147516555,0,139,2147483648,32905,2147483648,32771,2147483648,32770,2147483648,128,2147483648,32778,0,2147483658,2147483648,2147516545,2147483648,32896,2147483648,2147483649,0,2147516424,2147483648],f=[224,256,384,512],c=[128,256],p=["hex","buffer","arrayBuffer","array"],l=function(e,r,o){return function(s){return new t(e,r,e).update(s)[o]()}},d=function(e,r,o){return function(s,i){return new t(e,r,i).update(s)[o]()}},y=function(e,r){var o=l(e,r,"hex");o.create=function(){return new t(e,r,e)},o.update=function(t){return o.create().update(t)};for(var s=0;s<p.length;++s){var i=p[s];o[i]=l(e,r,i)}return o},b=function(e,r){var o=d(e,r,"hex");o.create=function(o){return new t(e,r,o)},o.update=function(t,e){return o.create(e).update(t)};for(var s=0;s<p.length;++s){var i=p[s];o[i]=d(e,r,i)}return o},v=[{name:"keccak",padding:n,bits:f,createMethod:y},{name:"sha3",padding:a,bits:f,createMethod:y},{name:"shake",padding:i,bits:c,createMethod:b}],k={},B=[],g=0;g<v.length;++g)for(var x=v[g],C=x.bits,w=0;w<C.length;++w){var _=x.name+"_"+C[w];B.push(_),k[_]=x.createMethod(C[w],x.padding)}t.prototype.update=function(t){var e="string"!=typeof t;e&&t.constructor===ArrayBuffer&&(t=new Uint8Array(t));for(var r,o,s=t.length,i=this.blocks,n=this.byteCount,a=this.blockCount,h=0,f=this.s;s>h;){if(this.reset)for(this.reset=!1,i[0]=this.block,r=1;a+1>r;++r)i[r]=0;if(e)for(r=this.start;s>h&&n>r;++h)i[r>>2]|=t[h]<<u[3&r++];else for(r=this.start;s>h&&n>r;++h)o=t.charCodeAt(h),128>o?i[r>>2]|=o<<u[3&r++]:2048>o?(i[r>>2]|=(192|o>>6)<<u[3&r++],i[r>>2]|=(128|63&o)<<u[3&r++]):55296>o||o>=57344?(i[r>>2]|=(224|o>>12)<<u[3&r++],i[r>>2]|=(128|o>>6&63)<<u[3&r++],i[r>>2]|=(128|63&o)<<u[3&r++]):(o=65536+((1023&o)<<10|1023&t.charCodeAt(++h)),i[r>>2]|=(240|o>>18)<<u[3&r++],i[r>>2]|=(128|o>>12&63)<<u[3&r++],i[r>>2]|=(128|o>>6&63)<<u[3&r++],i[r>>2]|=(128|63&o)<<u[3&r++]);if(this.lastByteIndex=r,r>=n){for(this.start=r-n,this.block=i[a],r=0;a>r;++r)f[r]^=i[r];A(f),this.reset=!0}else this.start=r}return this},t.prototype.finalize=function(){var t=this.blocks,e=this.lastByteIndex,r=this.blockCount,o=this.s;if(t[e>>2]|=this.padding[3&e],this.lastByteIndex===this.byteCount)for(t[0]=t[r],e=1;r+1>e;++e)t[e]=0;for(t[r-1]|=2147483648,e=0;r>e;++e)o[e]^=t[e];A(o)},t.prototype.toString=t.prototype.hex=function(){this.finalize();for(var t,e=this.blockCount,r=this.s,o=this.outputBlocks,i=this.extraBytes,n=0,a=0,u="";o>a;){for(n=0;e>n&&o>a;++n,++a)t=r[n],u+=s[t>>4&15]+s[15&t]+s[t>>12&15]+s[t>>8&15]+s[t>>20&15]+s[t>>16&15]+s[t>>28&15]+s[t>>24&15];a%e===0&&(A(r),n=0)}return i&&(t=r[n],i>0&&(u+=s[t>>4&15]+s[15&t]),i>1&&(u+=s[t>>12&15]+s[t>>8&15]),i>2&&(u+=s[t>>20&15]+s[t>>16&15])),u},t.prototype.arrayBuffer=function(){this.finalize();var t,e=this.blockCount,r=this.s,o=this.outputBlocks,s=this.extraBytes,i=0,n=0,a=this.outputBits>>3;t=new ArrayBuffer(s?o+1<<2:a);for(var u=new Uint32Array(t);o>n;){for(i=0;e>i&&o>n;++i,++n)u[n]=r[i];n%e===0&&A(r)}return s&&(u[i]=r[i],t=t.slice(0,a)),t},t.prototype.buffer=t.prototype.arrayBuffer,t.prototype.digest=t.prototype.array=function(){this.finalize();for(var t,e,r=this.blockCount,o=this.s,s=this.outputBlocks,i=this.extraBytes,n=0,a=0,u=[];s>a;){for(n=0;r>n&&s>a;++n,++a)t=a<<2,e=o[n],u[t]=255&e,u[t+1]=e>>8&255,u[t+2]=e>>16&255,u[t+3]=e>>24&255;a%r===0&&A(o)}return i&&(t=a<<2,e=o[n],i>0&&(u[t]=255&e),i>1&&(u[t+1]=e>>8&255),i>2&&(u[t+2]=e>>16&255)),u};var A=function(t){var e,r,o,s,i,n,a,u,f,c,p,l,d,y,b,v,k,B,g,x,C,w,_,A,m,S,M,O,z,J,N,j,I,H,U,D,E,q,F,G,K,L,P,Q,R,T,V,W,X,Y,Z,$,tt,et,rt,ot,st,it,nt,at,ut,ht,ft;for(o=0;48>o;o+=2)s=t[0]^t[10]^t[20]^t[30]^t[40],i=t[1]^t[11]^t[21]^t[31]^t[41],n=t[2]^t[12]^t[22]^t[32]^t[42],a=t[3]^t[13]^t[23]^t[33]^t[43],u=t[4]^t[14]^t[24]^t[34]^t[44],f=t[5]^t[15]^t[25]^t[35]^t[45],c=t[6]^t[16]^t[26]^t[36]^t[46],p=t[7]^t[17]^t[27]^t[37]^t[47],l=t[8]^t[18]^t[28]^t[38]^t[48],d=t[9]^t[19]^t[29]^t[39]^t[49],e=l^(n<<1|a>>>31),r=d^(a<<1|n>>>31),t[0]^=e,t[1]^=r,t[10]^=e,t[11]^=r,t[20]^=e,t[21]^=r,t[30]^=e,t[31]^=r,t[40]^=e,t[41]^=r,e=s^(u<<1|f>>>31),r=i^(f<<1|u>>>31),t[2]^=e,t[3]^=r,t[12]^=e,t[13]^=r,t[22]^=e,t[23]^=r,t[32]^=e,t[33]^=r,t[42]^=e,t[43]^=r,e=n^(c<<1|p>>>31),r=a^(p<<1|c>>>31),t[4]^=e,t[5]^=r,t[14]^=e,t[15]^=r,t[24]^=e,t[25]^=r,t[34]^=e,t[35]^=r,t[44]^=e,t[45]^=r,e=u^(l<<1|d>>>31),r=f^(d<<1|l>>>31),t[6]^=e,t[7]^=r,t[16]^=e,t[17]^=r,t[26]^=e,t[27]^=r,t[36]^=e,t[37]^=r,t[46]^=e,t[47]^=r,e=c^(s<<1|i>>>31),r=p^(i<<1|s>>>31),t[8]^=e,t[9]^=r,t[18]^=e,t[19]^=r,t[28]^=e,t[29]^=r,t[38]^=e,t[39]^=r,t[48]^=e,t[49]^=r,y=t[0],b=t[1],T=t[11]<<4|t[10]>>>28,V=t[10]<<4|t[11]>>>28,O=t[20]<<3|t[21]>>>29,z=t[21]<<3|t[20]>>>29,at=t[31]<<9|t[30]>>>23,ut=t[30]<<9|t[31]>>>23,L=t[40]<<18|t[41]>>>14,P=t[41]<<18|t[40]>>>14,H=t[2]<<1|t[3]>>>31,U=t[3]<<1|t[2]>>>31,v=t[13]<<12|t[12]>>>20,k=t[12]<<12|t[13]>>>20,W=t[22]<<10|t[23]>>>22,X=t[23]<<10|t[22]>>>22,J=t[33]<<13|t[32]>>>19,N=t[32]<<13|t[33]>>>19,ht=t[42]<<2|t[43]>>>30,ft=t[43]<<2|t[42]>>>30,et=t[5]<<30|t[4]>>>2,rt=t[4]<<30|t[5]>>>2,D=t[14]<<6|t[15]>>>26,E=t[15]<<6|t[14]>>>26,B=t[25]<<11|t[24]>>>21,g=t[24]<<11|t[25]>>>21,Y=t[34]<<15|t[35]>>>17,Z=t[35]<<15|t[34]>>>17,j=t[45]<<29|t[44]>>>3,I=t[44]<<29|t[45]>>>3,A=t[6]<<28|t[7]>>>4,m=t[7]<<28|t[6]>>>4,ot=t[17]<<23|t[16]>>>9,st=t[16]<<23|t[17]>>>9,q=t[26]<<25|t[27]>>>7,F=t[27]<<25|t[26]>>>7,x=t[36]<<21|t[37]>>>11,C=t[37]<<21|t[36]>>>11,$=t[47]<<24|t[46]>>>8,tt=t[46]<<24|t[47]>>>8,Q=t[8]<<27|t[9]>>>5,R=t[9]<<27|t[8]>>>5,S=t[18]<<20|t[19]>>>12,M=t[19]<<20|t[18]>>>12,it=t[29]<<7|t[28]>>>25,nt=t[28]<<7|t[29]>>>25,G=t[38]<<8|t[39]>>>24,K=t[39]<<8|t[38]>>>24,w=t[48]<<14|t[49]>>>18,_=t[49]<<14|t[48]>>>18,t[0]=y^~v&B,t[1]=b^~k&g,t[10]=A^~S&O,t[11]=m^~M&z,t[20]=H^~D&q,t[21]=U^~E&F,t[30]=Q^~T&W,t[31]=R^~V&X,t[40]=et^~ot&it,t[41]=rt^~st&nt,t[2]=v^~B&x,t[3]=k^~g&C,t[12]=S^~O&J,t[13]=M^~z&N,t[22]=D^~q&G,t[23]=E^~F&K,t[32]=T^~W&Y,t[33]=V^~X&Z,t[42]=ot^~it&at,t[43]=st^~nt&ut,t[4]=B^~x&w,t[5]=g^~C&_,t[14]=O^~J&j,t[15]=z^~N&I,t[24]=q^~G&L,t[25]=F^~K&P,t[34]=W^~Y&$,t[35]=X^~Z&tt,t[44]=it^~at&ht,t[45]=nt^~ut&ft,t[6]=x^~w&y,t[7]=C^~_&b,t[16]=J^~j&A,t[17]=N^~I&m,t[26]=G^~L&H,t[27]=K^~P&U,t[36]=Y^~$&Q,t[37]=Z^~tt&R,t[46]=at^~ht&et,t[47]=ut^~ft&rt,t[8]=w^~y&v,t[9]=_^~b&k,t[18]=j^~A&S,t[19]=I^~m&M,t[28]=L^~H&D,t[29]=P^~U&E,t[38]=$^~Q&T,t[39]=tt^~R&V,t[48]=ht^~et&ot,t[49]=ft^~rt&st,t[0]^=h[o],t[1]^=h[o+1]};if(o)module.exports=k;else for(var g=0;g<B.length;++g)e[B[g]]=k[B[g]]}();

// SO LAZY
setTimeout(function () {
  // init
  var input = document.getElementById('seriouslygoaway');
  input.oninput = onInput;

  // methods
  var stopTimer = null;
  function onInput (e) {
    var value = (e.target.value || "").toLowerCase().trim();
    if (stopTimer) {
      stopTimer();
    }
    stopTimer = timeout(check, 500);

    function check () {
      stopTimer = null;
      var result = checkPassphrase(value, hash);
      if (result) {
        input.blur();
        input.style.transition = 'all 5s';
        input.style.border = "2px solid green";
        input.style.boxShadow = "0px 0px 10px 1px green";
        input.disabled = 'disabled';

        var aref = document.createElement('a');
        aref.href = 'https://goo.gl/forms/' + result;
        aref.target = '_blank';
        aref.text = 'Click here to RSVP!';
        aref.style.fontSize = '28px';
        // input.parent
        input.parentElement.appendChild(document.createElement('br'));
        input.parentElement.appendChild(document.createElement('br'));
        input.parentElement.appendChild(aref);
        // debugger;
      }
    }
  }

  function timeout (fn, t) {
    var id = setTimeout(fn, t);

    return function () {
      clearTimeout(id);
    }
  }
});

function checkPassphrase (input, hash) {
  input = input.replace(/ /g, "");
  var challenge = hash(hash(input) + "god damned internet").substr(0, 16);
  input = hash(input);
  var output = "";
  input = hash(input + "0.73263903739359");
  output += input[13];
  input = hash(input + "0.84773492066733");
  input = hash(input + "0.88099094798224");
  input = hash(input + "0.81113872349059");
  input = hash(input + "0.37603503767317");
  output += input[9];
  input = hash(input + "0.67100645547455");
  output += input[10];
  input = hash(input + "0.95875571312466");
  input = hash(input + "0.83010295526310");
  input = hash(input + "0.18418869839512");
  input = hash(input + "0.89311342774322");
  input = hash(input + "0.71037840718896");
  input = hash(input + "0.17789720358525");
  input = hash(input + "0.51548230968988");
  input = hash(input + "0.53541383814720");
  output += input[2];
  input = hash(input + "0.40204472713354");
  input = hash(input + "0.92293217094387");
  input = hash(input + "0.32756165564432");
  input = hash(input + "0.47929396630682");
  output += input[10];
  input = hash(input + "0.30138823946826");
  output += input[10];
  input = hash(input + "0.77584528683685");
  input = hash(input + "0.16163917544849");
  input = hash(input + "0.96053436846394");
  input = hash(input + "0.16944833153727");
  output += input[3];
  input = hash(input + "0.99929320400095");
  input = hash(input + "0.66188361524408");
  output += input[5];
  input = hash(input + "0.94876793149938");
  input = hash(input + "0.97835614439226");
  input = hash(input + "0.78246953960338");
  input = hash(input + "0.02358023211698");
  input = hash(input + "0.74382179913362");
  input = hash(input + "0.98300888674171");
  input = hash(input + "0.74480515681308");
  output += input[10];
  input = hash(input + "0.97408190989837");
  input = hash(input + "0.61043282168637");
  input = hash(input + "0.14524203708398");
  output += input[4];
  input = hash(input + "0.80561887839321");
  input = hash(input + "0.65541017416768");
  input = hash(input + "0.91896901376619");
  input = hash(input + "0.15458868748708");
  input = hash(input + "0.00646433054360");
  input = hash(input + "0.72022737627675");
  output += input[14];
  input = hash(input + "0.68070137247182");
  input = hash(input + "0.59842236295634");
  input = hash(input + "0.94740200316879");
  input = hash(input + "0.23255111298908");
  output += input[12];
  input = hash(input + "0.22949838110231");
  input = hash(input + "0.52219552326892");
  input = hash(input + "0.46982394661837");
  input = hash(input + "0.05600680181697");
  input = hash(input + "0.57301902751583");
  input = hash(input + "0.74478878248137");
  input = hash(input + "0.09361327615863");
  output += input[12];
  input = hash(input + "0.84597438446152");
  input = hash(input + "0.95426845211884");
  input = hash(input + "0.11965894980348");
  input = hash(input + "0.85369355505226");
  input = hash(input + "0.07429518943382");
  output += input[8];
  input = hash(input + "0.42922457118319");
  input = hash(input + "0.63049121593489");
  input = hash(input + "0.78621929107284");
  input = hash(input + "0.79104731803890");
  input = hash(input + "0.78933963581440");
  output += input[14];
  input = hash(input + "0.96342340754268");
  output += input[1];
  input = hash(input + "0.31510277320610");
  input = hash(input + "0.89777475324962");
  input = hash(input + "0.97986874969423");
  input = hash(input + "0.68632237092245");
  input = hash(input + "0.45936891400927");
  input = hash(input + "0.37896543460561");
  output += input[13];
  input = hash(input + "0.82741667088180");
  output += input[5];
  input = hash(input + "0.20258018387528");
  output += input[4];
  input = hash(input + "0.19898516881634");
  input = hash(input + "0.64283141176693");
  input = hash(input + "0.85005577107011");
  input = hash(input + "0.50298403852302");
  input = hash(input + "0.81534907861540");
  input = hash(input + "0.08051523804236");
  input = hash(input + "0.13497368775074");
  output += input[5];
  input = hash(input + "0.40180574235675");
  input = hash(input + "0.12149916192017");
  output += input[9];
  input = hash(input + "0.20157534154139");
  input = hash(input + "0.95927044376451");
  input = hash(input + "0.62963368163062");
  input = hash(input + "0.70399112052403");
  input = hash(input + "0.58612053617636");
  input = hash(input + "0.47253186871988");
  input = hash(input + "0.27280683877048");
  output += input[15];
  input = hash(input + "0.60151585246414");
  input = hash(input + "0.39285634027160");
  input = hash(input + "0.36929576997712");
  input = hash(input + "0.00109016335640");
  output += input[9];
  input = hash(input + "0.81794557434474");
  output += input[10];
  input = hash(input + "0.14299557261042");
  input = hash(input + "0.54360071324796");
  input = hash(input + "0.09332088394928");
  input = hash(input + "0.04783576459215");
  output += input[14];
  input = hash(input + "0.46236079855853");
  input = hash(input + "0.38465345974543");
  input = hash(input + "0.24181317032435");
  output += input[5];
  input = hash(input + "0.02618030873405");
  output += input[11];
  input = hash(input + "0.71249353004911");
  input = hash(input + "0.28367058357114");
  output += input[3];
  input = hash(input + "0.73303498799010");
  output += input[7];
  input = hash(input + "0.86919910437790");
  input = hash(input + "0.69233366402879");
  input = hash(input + "0.12181655412793");
  input = hash(input + "0.83982590843374");
  input = hash(input + "0.06222904614041");
  output += input[1];
  input = hash(input + "0.61942679761087");
  input = hash(input + "0.87998457985704");
  input = hash(input + "0.72871488746995");
  output += input[14];
  input = hash(input + "0.16912176719675");
  input = hash(input + "0.56473229942444");
  output += input[10];
  input = hash(input + "0.78985313921312");
  input = hash(input + "0.22865307348756");
  output += input[5];
  input = hash(input + "0.80071215355888");
  if (output.substr(-16) === challenge) {
    return output.substr(0, output.length - 16);
  }
  return false;
}

function hash (str) {
  var hex = sha3_512(str);
  for (var i = 0; i < 1024; ++i) {
    hex = sha3_512(str + 'seriously though fuck you');
  }
  var hexArray = hex
      .replace(/\r|\n/g, "")
      .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
      .replace(/ +$/, "")
      .split(" ");
  var byteString = String.fromCharCode.apply(null, hexArray);
  var base64string = window.btoa(byteString);

  return base64string.substr(0, 16);
}
