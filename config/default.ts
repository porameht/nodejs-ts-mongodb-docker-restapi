export default {
  port: 1337,
  dbUri: "mongodb://localhost:27017/rest-api-tutorial",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  publicKey: `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/9FcqRXS54BC/WI4I3bSalwlU
  x9+mE0udobcPbVFFgSjyBD2tTTcOLaD814h4yThpzNMJO/xTyQDdZvP6jk7eam4k
  7TtL6Di90sBupYNQn/iAkXhKdKzxNnNHImnKjPfGBkXBP52TIBfvvPHp9I6AVY6p
  qLnjGAlscXRDebmwrQIDAQAB
  -----END PUBLIC KEY-----`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIICXgIBAAKBgQC/9FcqRXS54BC/WI4I3bSalwlUx9+mE0udobcPbVFFgSjyBD2t
  TTcOLaD814h4yThpzNMJO/xTyQDdZvP6jk7eam4k7TtL6Di90sBupYNQn/iAkXhK
  dKzxNnNHImnKjPfGBkXBP52TIBfvvPHp9I6AVY6pqLnjGAlscXRDebmwrQIDAQAB
  AoGBAJQ3awas0tCjfssA6ctWxZmIfiAEpWBrDbwNnng/BL4SWTdmpukl8hj0ipYx
  JqN9XB31lg5PTyqyzgQm9sTFFYe5XGs/PpO7oSJmh4Bi2otfD8Ks8B1ABgRZ84lS
  ioBTID5xVYdbHzlDXKNczn7D71DugFBmr/Y8a/WbukbA+7/RAkEA41UtWIaMwiOR
  /mnkDn53BZV9DH2zrns4S59g2rcwqZNOa7nJx2x142k3Go9PL3nhUV6PELOGfufz
  wXYxIG6WnwJBANgpElBSJNyaXyDWzL+OYTve8p6FsoQ1tPOHkx8lgRyYccSTfaXu
  b6S0MPfFEqxnIypi5pLDA1uAm9aVDoxa8TMCQQC9wk7cs0txjmGCPX+5PYU6awL7
  1z2SKpbeQQaG6x06n5R5RZcR2Q46qovtpqxRk+opksXXChP9gL6uwWrWiJk/AkEA
  rXh4fAEQGAHC6eW3ttqaaaPH7TO6SaOYLf/VL5+3d61XT7xVj35EFleNHKoJDFZQ
  wElSZOEfpqUVayV/4V9yRQJAUPBVmApHNVfFAYntrnxmFIpNImeFIPGAKpizXS6u
  iPEsOLOWMM3A2bEmJOLMiyvdjR2T+Sk1u7n4bMjiiBMb+A==
  -----END RSA PRIVATE KEY-----`,
};
