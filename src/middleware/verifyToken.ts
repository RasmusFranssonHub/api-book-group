import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        username: string;
        is_admin: boolean;
      };
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.cookies.accessToken === undefined) {
    res.status(401).json({ message: "Not logged in" });
    return;
  }

  jwt.verify(
    req.cookies.accessToken,
    process.env.JWT_SECRET || "",
    (error: jwt.VerifyErrors | null, decoded?: string | jwt.JwtPayload) => {
      if (error) {
        res.status(403).json({ message: "Invalid token" });
        return;
      }

      req.user = decoded as {
        userId: string;
        username: string;
        is_admin: boolean;
      };

      next();
    }
  );
};

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(401).json({ message: "Not logged in" });
    return;
  }

  if (!req.user.is_admin) {
    res.status(403).json({ message: "Admin access required" });
    return;
  }

  next();
};