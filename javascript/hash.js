/*
    - 문제 요구사항

    영문, 숫자, 특수문자를 포함(한글, 한자 등은 제외)한 임의의 데이터 d
    임의의 데이터 d(0 < length of d < 127byte)를 고정 길이 (32byte)로 변형
    collision 무시

    - 작성자 김소진

    - 참고 알고리즘 : SHA256
    https://github.com/b-con/crypto-algorithms
    https://csrc.nist.gov/csrc/media/publications/fips/180/4/final/documents/fips180-4-draft-aug2014.pdf
*/

// 블럭 사이즈
const HASH_SIZE = 32;

let message = {
    bitlen : null, // 입력 받은 메세지의 비트 길이
    datalen : null, // 기록된 메세지의 바이트 길이
    data: [], // 입력 받은 메세지 내용
    hash: [], // hash
}

// 해쉬 계산 함수들
function ROTATE(a,b) { // 비트를 잘라서 옮기기 - 오른쪽으로 rotate
    return ((a) >> (b)) | ((a) << (32-(b)));
}

function CH(x, y, z) {
    return ((x) & (y)) ^ (~(x) & (z));
}

function MAJ(x, y, z) {
    return ((x) & (y)) ^ ((x) & (z)) ^ ((y) & (z));
}

// 지수 계산
function EP0(x) {
    return ROTATE(x, 2) ^ ROTATE(x, 13) ^ ROTATE(x, 22);
}

function EP1(x) {
    return ROTATE(x, 6) ^ ROTATE(x, 11) ^ ROTATE(x, 25);
}

// 시그마 계산
function SIG0(x) {
    return ROTATE(x, 7) ^ ROTATE(x, 18) ^ ((x) >> 3);
}

function SIG1(x) {
    return ROTATE(x, 17) ^ ROTATE(x, 19) ^ ((x) >> 10);
}

let k = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
    0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
    0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
    0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
    0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
    0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
    0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
    0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
    0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
    0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
    0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);


// 최종값 얻기
function get_result(){
    // hash 결과
    let result = new Array();

    // 데이터 채우기
    pad_data();

    // hash 계산
    transform();

    // 리틀 엔디언을 빅 엔디언으로 바꾸기 위해 reverse하여 최종 result에 저장.
    // 비트 연산 &를 통해 두 글자씩 바꿈
    for(i = 0 ; i < 4 ; ++i){
        result[i] = message.hash[0] >> (24 - i * 8) & 0x000000ff;
        result[i + 4] = message.hash[1] >> (24 - i * 8) & 0x000000ff;
        result[i + 8] = message.hash[2] >> (24 - i * 8) & 0x000000ff;
        result[i + 12] = message.hash[3] >> (24 - i * 8) & 0x000000ff;
        result[i + 16] = message.hash[4] >> (24 - i * 8) & 0x000000ff;
        result[i + 20] = message.hash[5] >> (24 - i * 8) & 0x000000ff;
        result[i + 24] = message.hash[6] >> (24 - i * 8) & 0x000000ff;
        result[i + 28] = message.hash[7] >> (24 - i * 8) & 0x000000ff;
    }

    // 16진수 수로 조합
    const hex_tab = "0123456789abcdef";
    let password = "";

    for( i = 0; i < HASH_SIZE; i++) {
        password += hex_tab.charAt((result[i] >> ((3 - i % 4)) * HASH_SIZE + 4) & 0xF);
    }
    console.log(password);
    alert("암호 생성 완료 : \n" + password);
}

function pad_data(){
    let i = message.datalen;

    // 메세지를 길이를 기록할 마지막 8비트를 제외한 56비트를 기준으로 함
    if(message.datalen < 56) {
        message.data[i++] = 0x80;
        while(i < 56){
            message.data[i++] = 0x00;
        }
    } else {
        message.data[i++] = 0x80;
        while(i < 64) {
            message.data[i++] = 0x00;
        }
        transform(message);
    }

    message.bitlen = message.datalen * 8; // 비트길이 = 문자 길이 * 8
    message.data[63] = message.bitlen; // 입력 받은 문자의 비트 길이를 기록

    // 쉬프트 연산으로 8비트(1바이트)씩 다음 칸으로 이동하여 그 칸의 값을 data에 저장
    message.data[62] = message.bitlen >> 8;
    message.data[61] = message.bitlen >> 16;
    message.data[60] = message.bitlen >> 24;
    message.data[59] = message.bitlen >> 32;
    message.data[58] = message.bitlen >> 40;
    message.data[57] = message.bitlen >> 48;
    message.data[56] = message.bitlen >> 56;
}

// hash 계산! 자르고 뒤섞기
function transform() {
    let a, b, c, d, e, f, g, h, i, j, t1, t2;
    let m = new Array();

    // 64개인 data를 m 배열에 4개씩 잘라 넣음 ( 64 / 4 = 16)
    for (i = 0, j = 0 ; i < 16 ; ++i, j += 4){
        m[i] = (message.data[j] << 24) | (message.data[j + 1] << 16) | (message.data[j + 2] << 8) | (message.data[j + 3]);
    }

    // 나머지를 시그마 연산으로 채움
    for ( ; i < 64; ++i){
        m[i] = SIG1(m[i - 2]) + m[i - 7] + SIG0(m[i - 15]) + m[i - 16];
    }

    a = message.hash[0];
    b = message.hash[1];
    c = message.hash[2];
    d = message.hash[3];
    e = message.hash[4];
    f = message.hash[5];
    g = message.hash[6];
    h = message.hash[7];

    for (i = 0; i < 64; ++i) {
        t1 = h + EP1(e) + CH(e,f,g) + k[i] + m[i];
        t2 = EP0(a) + MAJ(a,b,c);
        h = g;
        g = f;
        f = e;
        e = d + t1;
        d = c;
        c = b;
        b = a;
        a = t1 + t2;
    }

    message.hash[0] += a;
    message.hash[1] += b;
    message.hash[2] += c;
    message.hash[3] += d;
    message.hash[4] += e;
    message.hash[5] += f;
    message.hash[6] += g;
    message.hash[7] += h;
}

// 입력 받은 메세지를 기록
function record_message(msg_str) {
    for (i = 0; i < msg_str.length; ++i) {
        message.data[message.datalen] = msg_str[i];
        message.datalen++;

        if (message.datalen == 64) {
            // 64자리 이상인 경우 자름
            transform(message, message.data);
            message.bitlen += 512; // 잘려도 비트 길이는 기록됨
            message.datalen = 0;
        }
    }
}

// message 객체 초기화
function init_message(){
    message.datalen = 0;
    message.bitlen = 0;
    message.data.length = 64;
    message.hash.length = 8;
    message.hash[0] = 0x6a09e667;
    message.hash[1] = 0xbb67ae85;
    message.hash[2] = 0x3c6ef372;
    message.hash[3] = 0xa54ff53a;
    message.hash[4] = 0x510e527f;
    message.hash[5] = 0x9b05688c;
    message.hash[6] = 0x1f83d9ab;
    message.hash[7] = 0x5be0cd19;
}

// SHA256 알고리즘을 이용한 암호화
function SHA256(msg){
    init_message();
    record_message(msg);
    get_result();
}

function check_input_value(input_msg){
    // 영문, 특수문자, 숫자를 포함한 1 ~ 127자리
    const regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{1,127}$/;

    if(regExp.test(input_msg)){
        SHA256(input_msg);
    } else {
        alert("영문, 숫자, 특수문자를 포함한 비밀번호 1~127자리를 입력해주세요\n(한글, 한자 등 제외)");
    }
}
