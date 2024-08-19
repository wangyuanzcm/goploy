// Copyright 2022 The Goploy Authors. All rights reserved.
// Use of this source code is governed by a GPLv3-style
// license that can be found in the LICENSE file.

package cmd

import (
	"fmt"
	"path"
	"strings"
)

type LinuxCmd struct{}

func (c LinuxCmd) Script(mode, file string) string {
	if mode == "" {
		mode = "bash"
	}
 // 使用 firejail 沙箱工具来运行脚本
 return fmt.Sprintf("firejail --private %s %s", mode, file)}

func (c LinuxCmd) ChangeDirTime(dir string) string {
	return fmt.Sprintf("touch -m %s", dir)
}

func (LinuxCmd) Symlink(src, target string) string {
	// use relative path to fix docker symlink
	relativeSrc := strings.Replace(src, path.Dir(target), ".", 1)
	return fmt.Sprintf("ln -sfn %s %s", relativeSrc, target)
}

func (LinuxCmd) Remove(file string) string {
	return fmt.Sprintf("rm -f %s", file)
}
